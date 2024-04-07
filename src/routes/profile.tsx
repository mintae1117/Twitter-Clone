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

const Header1 = styled.div`
    position: relative;
    top: 0px;
    height: 52px;
    display: flex;
    border-bottom: 0.5px solid gray;
    flex-direction: row;
    z-index: 1;// 충분한 크기의 z index 주기 (최상단 표시).
`;

const HeaderBtn1 = styled.button`
    &.active{
        font-weight: 700;
        text-decoration: underline;
        text-underline-offset: 16px;
        text-decoration-thickness: 4px;
        text-decoration-color: #1C9BEF;
        color: white;
    }
    cursor: pointer;
    font-size: 15px;
    font-weight: 300;
    width: 100%;
    max-width: 300px;
    color: gray;
    border-color: transparent;
    background-color: rgba(0, 0, 0, 0.85);
    &:hover{
        background-color: rgba(34, 34, 34, 0.8);
    }
`;

const FancyBox = styled.div`
    display: flex;
    flex-direction: column;
    height: 220px;
    width: 100%;
    max-width: 600px;
    padding: 15px;
    gap: 30px;
    overflow-x: scroll;
    border-bottom: 0.5px solid gray;
`;

const FancyRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 30px;
`;

const FancyItemBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const FancyItems = styled.img`
    width: 100%;
    border-radius: 15px;
    content: url(https://ton.twimg.com/onboarding/persistent_nux/follow_2x.png);
`;

const FancyItems1 = styled.img`
    width: 100%;
    border-radius: 15px;
    content: url(https://ton.twimg.com/onboarding/persistent_nux/topics_2x.png);
`;

const FancyItems2 = styled.img`
    width: 100%;
    border-radius: 15px;
    content: url(https://ton.twimg.com/onboarding/persistent_nux/profile_2x.png);
`;

export default function Profile(){
    const user = auth.currentUser;
    const [avatar, setAvatar] = useState(user?.photoURL);
    const [tweets, setTweets] = useState<ITweet[]>([]);
    //const [bio, setBio] = useState("");
    //const [avatarName, setavatarName] = useState(user?.displayName);
    const [bgImg, setbgImg] = useState("");
    const storage = getStorage();

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
            querySnapshot.forEach((d) => {
            //console.log(d.id, " => ", d.data());
            updateDoc(doc(db, "tweets", d.id), {
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
            where("userId", "==", user?.uid),
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
    }, []);

    return (
        <Wrapper>
            <Header>
                <HeaderBtn>{user?.displayName ?? "Anonymous"}</HeaderBtn>
            </Header>
            <BackgroundImg htmlFor="bgImg">
                {bgImg ? <BgImg src={bgImg}></BgImg> : null}
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
            <MyProfileBox>
                <Name>{user?.displayName ?? "Anonymous"}</Name>
                <Email>{user?.email ?? "Email not registered"}</Email>
                {/*bio ? <h3>{bio}</h3> : null*/}
                <Email>Joined {user?.metadata.creationTime?.slice(8, 16) ?? "Undefined"}.</Email>
            </MyProfileBox>
            <Header1>
                <HeaderBtn1 className={"active"}>Posts</HeaderBtn1>
                <HeaderBtn1 >Replies</HeaderBtn1>
                <HeaderBtn1 >Highlights</HeaderBtn1>
                <HeaderBtn1 >Articles</HeaderBtn1>
                <HeaderBtn1 >Media</HeaderBtn1>
                <HeaderBtn1 >Likes</HeaderBtn1>
            </Header1>
            <FancyBox>
                <Name>Let's get you set up</Name>
                <FancyRow>
                <FancyItemBox><FancyItems /><p>This means nothing</p></FancyItemBox>
                <FancyItemBox><FancyItems1 /><p>Just few colorful boxs</p></FancyItemBox>
                <FancyItemBox><FancyItems2 /><p>In original X app.</p></FancyItemBox>
                </FancyRow>
            </FancyBox>
            {tweets.map((tweet) => (
            <Tweet key={tweet.id} {...tweet} />
            ))}
        </Wrapper>
    );
}