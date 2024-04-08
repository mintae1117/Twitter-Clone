import { styled } from "styled-components";
import { auth,  db } from "../firebase";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
    collection,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";
import FacnyProfile from "../components/fancyprofile";
import { useOutsideClick } from "../useOutsideClick";

const Wrapper = styled.div`
    position: relative;
    background-color: black;
    display: flex;
    flex-direction: column;
    width: 600px;
    max-width: 600px;
    border-left: 0.5px solid gray;
    border-right: 0.5px solid gray;
    @media (max-width: 660px) {
        width: 100%;
    }
`;

const BackgroundImg = styled.label`
    width: 100%;
    height: 200px;
    background-color: #333639;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    display: flex;
    cursor: pointer;
`;

const BgImg = styled.img`
    width: 100%;
`;

const Header = styled.div`
    position: sticky;
    top: 0px;
    height: 52px;
    display: flex;
    flex-direction: row;
    z-index: 10;// 충분한 크기의 z index 주기 (최상단 표시).
`;

const HeaderBtn = styled.button`
    cursor: pointer;
    font-size: 20px;
    font-weight: 700;
    width: 100%;
    color: white;
    border-color: transparent;
    background-color: rgba(0, 0, 0, 0.85);
`;

const AvatarUpload = styled.label`
    position: absolute;
    top: 180px;
    left: 15px;
    width: 140px;
    height: 140px;
    overflow: hidden;
    border: 4px solid black;
    border-radius: 50%;
    background-color: gray;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        width: 50px;
    }
`;

const AvatarImg = styled.img`
  width: 100%;
`;

const AvatarInput = styled.input`
  display: none;
`;

const MyProfileBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
    width: 100%;
    height: auto;
    padding: 15px;
    margin-top: 70px;
`;

const Name = styled.span`
    font-size: 20px;
    font-weight: 700;
`;

const Email = styled.span`
    font-size: 15px;
    color: gray;
`;

const EditBtn = styled.div`
    cursor: pointer;
    position: absolute;
    text-align: center;
    top: 265px;
    right: 15px;
    width: 110px;
    height: 35px;
    padding-top: 8px;
    border-radius: 20px;
    font-weight: 500;
    border: 1px solid gray;
    &:hover{
        transition-duration: 0.3s;
        background-color: #232323;
    }
`;

const Editbox = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    text-align: center;
    top: 30%;
    width: 100%;
    max-width: 600px;
    height: auto;
    min-height: 200px;
    border: 1px solid white;
    background-color: black;
    padding: 20px;
    gap: 20px;
    z-index: 20;
    border-radius: 10px;
    box-shadow: white 0px 0px 5px 0px, white 0px 0px 1px 0px;
    @media (max-width: 660px) {
        width: 80%;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 60px;
    margin-right: 30px;// 왼쪽 오른쪽 공백
`;

const TextArea = styled.textarea`
    border: none;
    border-bottom: 0.5px solid gray;
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 20px;
    color: white;
    background-color: transparent;
    width: 100%;
    height: 60px;
    resize: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    &::placeholder {
    font-size: 20px;
    }
    &:focus {
    outline: none;
    }
`;

const SubmitBtn = styled.input`
    margin-left: auto;
    background-color: #1d9bf0;
    width: 100px;
    height: 40px;
    color: white;
    border: none;
    padding: 10px 0px;
    border-radius: 50px;
    font-size: 16px;
    float: right;
    cursor: pointer;
    &:hover,
    &:active {
    background-color: #1887d1;
    }
`;

export default function Profile(){
    const user = auth.currentUser;
    const [avatar, setAvatar] = useState(user?.photoURL);
    const [tweets, setTweets] = useState<ITweet[]>([]);
    //const [bio, setBio] = useState("");
    //const [avatarName, setavatarName] = useState(user?.displayName);
    const [bgImg, setbgImg] = useState("");
    const storage = getStorage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editname, seteditname] = useState(user?.displayName);

    const modalref = useOutsideClick(() => {
        setIsModalOpen(false);
    });// modal outside click ref.

    useEffect(() => {
        getDownloadURL(ref(storage, "bgimg/" + user?.uid))
        .then((url) => {
            setbgImg(url);
        })
        .catch((error) => {
            console.log(error);
        });// getting bgurl from storage.
    }, []);

    const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!user) return;
        const avatarok = confirm("Are you sure you want to edit your avatar image?");
        if (files && files.length === 1 && avatarok) {
            const maxfilesize = 1 * 1024 * 1024;// file 크기 제한 1mb
            if(files && files[0].size > maxfilesize){
                alert("File size is too big. maximun file size is 1mb");
                return;
            }// filesize가 1mb 보다 크면 alert 띄우고 return.
            const file = files[0];
            const locationRef = ref(storage, `avatars/${user?.uid}`);
            const result = await uploadBytes(locationRef, file);
            const avatarUrl = await getDownloadURL(result.ref);
            setAvatar(avatarUrl);
            await updateProfile(user, {
                photoURL: avatarUrl,
                //displayName: "악동꿀벌", // name change test
            });
            
            const q = query(collection(db, "tweets"), where("userId", "==", user?.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (d) => {
            //console.log(d.id, " => ", d.data());
            await updateDoc(doc(db, "tweets", d.id), {
                avatarUrl: avatarUrl,
                //username: "악동꿀벌", // name change test
            });
            });// get docs and set avatarurl again.

        }
    };// user.photourl 을 avatarurl로 업데이트 시켜주기.

    const onBgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!user) return;
        const bgimgok = confirm("Are you sure you want to edit your background image?");
        if (files && files.length === 1 && bgimgok) {
            const maxfilesize = 1 * 1024 * 1024;// file 크기 제한 1mb
            if(files && files[0].size > maxfilesize){
                alert("File size is too big. maximun file size is 1mb");
                return;
            }// filesize가 1mb 보다 크면 alert 띄우고 return.
            const file = files[0];
            const locationRef = ref(storage, `bgimg/${user?.uid}`);
            const result = await uploadBytes(locationRef, file);
            const bgUrl = await getDownloadURL(result.ref);
            setbgImg(bgUrl);
        }
    };// bgimg 을 storage로 업데이트 시켜주기.

    const fetchTweets = async () => {
        const tweetsQuery = query(
            collection(db, "tweets"),
            where("userId", "==", user?.uid),// where을 써서 userid 가 같은것들만 가져온다! firebase에 따로 추가해야함!
            orderBy("createdDate", "desc"),
            limit(30)// 최근 30개만 가져오기. 요금제 때문에.
        );
        const snapshot = await getDocs(tweetsQuery);
        const tweets = snapshot.docs.map((doc) => {
            const { tweet, createdDate, userId, username, photo, avatarUrl } = doc.data();
            return {
                tweet,
                createdDate,
                userId,
                username,
                photo,
                avatarUrl,
                id: doc.id,
            };
        });
        setTweets(tweets);
    };

    useEffect(() => {
        fetchTweets();
    }, []);// fetching tweets for profile timeline.

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        seteditname(e.target.value);
    };

    const onSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;
        const editok = confirm("Are you sure you want to edit your name?");
        if(editname === user.displayName){
            alert("No edit found");
        }
        if (editok && editname !== user.displayName) {
            await updateProfile(user, {
                displayName: editname, // name change test
            });
            const q = query(collection(db, "tweets"), where("userId", "==", user?.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (d) => {
            //console.log(d.id, " => ", d.data());
            await updateDoc(doc(db, "tweets", d.id), {
                username: editname, // name change test
            });
            });// get docs and set avatarurl again.
        }
        setIsModalOpen(false);
    };// submit to edit name using updateprofile, updatedoc.

    return (
        <Wrapper>
            <Header>
                <HeaderBtn>{user?.displayName ?? "Anonymous"}</HeaderBtn>
            </Header>
            <BackgroundImg htmlFor="bgImg">
                {bgImg ? <BgImg src={bgImg}></BgImg> : <div><p>Touch for edit.</p></div>}
            </BackgroundImg>
            <AvatarUpload htmlFor="avatar">
                {avatar ? (
                <AvatarImg src={avatar} />
                ) : (
                <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                </svg>
                )}
            </AvatarUpload>
            <AvatarInput
                onChange={onAvatarChange}
                id="avatar"
                type="file"
                accept="image/*"
            />
            <AvatarInput
                onChange={onBgChange}
                id="bgImg"
                type="file"
                accept="image/*"
            />
            <EditBtn onClick={() => setIsModalOpen(true)}>Edit profile</EditBtn>
            <MyProfileBox>
                <Name>{user?.displayName ?? "Anonymous"}</Name>
                <Email>{user?.email ?? "Email not registered"}</Email>
                {/*bio ? <h3>{bio}</h3> : null*/}
                <Email>Joined {user?.metadata.creationTime?.slice(8, 16) ?? "Undefined"}.</Email>
            </MyProfileBox>
            <FacnyProfile />
            {tweets.map((tweet) => (
            <Tweet key={tweet.id} {...tweet} />
            ))}
            {isModalOpen === true ? 
            <Editbox ref={modalref}>
                <p>Touch photos if you want to edit them.</p>
                <Form onSubmit={onSubmitEdit}>
                    <TextArea
                        rows={3}
                        maxLength={30}
                        onChange={onChange}
                        placeholder="Write your new profile name."
                        required
                    />
                    <SubmitBtn type="submit" value={"Edit"} />
                </Form>
            </Editbox> : null}
        </Wrapper>
    );
}