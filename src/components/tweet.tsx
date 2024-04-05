import { styled } from "styled-components";
import { ITweet } from "./timeline";
import { useState } from "react";
import { useOutsideClick } from "../useOutsideClick";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import EmojiPicker, { EmojiStyle, Theme } from 'emoji-picker-react';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-left: 60px;
    border-bottom: 0.5px solid gray;
`;

const Column = styled.div``;

const Columnsvg = styled.div`
    margin-top: 5px;
    margin-bottom: -10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    svg{
        color: gray;
        width: 20px;
        cursor: pointer;
    }
`;

const Photo = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 5px;
`;

const Payload = styled.p`
    margin: 10px 0px;
    font-size: 18px;
`;

const Username = styled.span`
    font-weight: 600;
    font-size: 15px;
`;

const UserDate = styled.span`
    font-weight: 200;
    font-size: 14px;
    color: gray;
`;

const MoreBox = styled.div`
    float: right;
    position: relative;
`;

const MoreBtn = styled.div`
    float: right;
    margin-top: -10px;
    border-radius: 50%;
    svg{
        cursor: pointer;
        width: 30px;
        border-radius: 50%;
        color: gray;
    }
    :hover{
        transition-duration: 0.3s;
        background-color: #0f5d91;
    }
`;

const ModalDiv = styled.div`
    position: absolute;
    right: 0px;
    top: -10px;
    border-radius: 10px;
    background-color: black;
    box-shadow: white 0px 0px 5px 0px, white 0px 0px 1px 0px;
`;

const ModalBtn = styled.div`
    cursor: pointer;
    width: 120px;
    height: 40px;
    color: white;
    font-size: 17px;
    background-color: transparent ;
    border-radius: 10px;
    align-content: center;
    text-align: center;
    svg{
        width: 15px;
        margin-right: 7px;
        padding: 0px;
    }
    &.del{
        color: tomato;
    }
`;

const Editbox = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 7%;
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
    margin-right: 25px;// 왼쪽 오른쪽 공백
`;

const TextArea = styled.textarea`
    border: none;
    border-bottom: 0.5px solid gray;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: -10px;
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

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 5px;
`;

const AttachFileButton = styled.label`
    padding: 10px 10px 12px 10px;
    color: #1C9BEF;
    font-size: 15px;
    cursor: pointer;
    svg{
        width: 25px;
        &:hover{
            opacity: 0.7;
        }
    }
`;

const AttachFileInput = styled.input`
    display: none;
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

const EmojiBox = styled.div`
    position: absolute;
    top: 70%;
    &.active{
        display: none;
    }
`;

const Imgdiv = styled.div`
    position: relative;
    width: 70%;
    max-height: 700px;
`;

const ImgArea = styled.img`
    width: 100%;
    border-radius: 5px;
    margin-top: 10px;
`;

export default function Tweet({ username, photo, tweet, createdDate, userId, id }: ITweet) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const user = auth.currentUser;
    const [isLoading, setLoading] = useState(false);
    const [edittweet, setEditTweet] = useState(tweet);
    const [emo, setEmoji] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [photourl,  setPhotourl] = useState(photo);

    const onDelete = async () => {
        const ok = confirm("Are you sure you want to delete this tweet?");
        if (!ok || user?.uid !== userId) return;
        try {
            await deleteDoc(doc(db, "tweets", id));
            if (photo) {
            const photoRef = ref(storage, `tweets/${user.uid}-${user.displayName}/${id}`);
            await deleteObject(photoRef);
            }
        } catch (e) {
            alert(e);
        } finally {
            window.location.replace("/");// 버튼 눌렀을때 새로고침 해서 올린 내용까지 나타내기.
        }
    };// delete button 기능.

    const elapsedTime = (date: number): string => {
        const start = new Date(date);
        const end = new Date();
        const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
        if (seconds < 60) return 'just now';
        const minutes = seconds / 60;
        if (minutes < 60) return `${Math.floor(minutes)}m`;
        const hours = minutes / 60;
        if (hours < 24) return `${Math.floor(hours)}h`;
        const days = hours / 24;
        if (days < 7) return `${Math.floor(days)}d`;
        return `${start.toLocaleDateString()}`;
    };// 몇분 몇시간 몇일 전인지 timestamp setting.

    const modalref = useOutsideClick(() => {
        setIsModalOpen(false);
    });// modal outside click ref.

    //-------------------edit start-------------------------
    const editref = useOutsideClick(() => {
        setIsEdit(false);
    });// modal outside click ref.

    const emojiref = useOutsideClick(() => {
        setEmoji(false);
    });// emoji outside click ref

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditTweet(e.target.value);
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        const maxfilesize = 1 * 1024 * 1024;// file 크기 제한 1mb
        if (files && files.length === 1) {
            const newimgsrc = URL.createObjectURL(files[0]);// file url 보여주기용 가져오기.
            if(files && files[0].size > maxfilesize){
                alert("File size is too big. maximun file size is 1mb");
                return;
            }// filesize가 1mb 보다 크면 alert 띄우고 return.
            setFile(files[0]);
            setPhotourl(newimgsrc);// 고른 이미지의 url 생성해서 보여주기용으로 보냄.
        }
        e.target.value = "";// 초기화 시켜주기! 초기화 해야만 같은파일 다시해도 읽음! re) onchage 때문에 파일이 바뀌지 않으면 읽지 못한다!! 중요!!
    };// read tweet file form onchange.

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;
        const editok = confirm("Are you sure you want to edit this tweet?");
        if (!user || isLoading || edittweet === "" || edittweet.length > 200 || !editok) return;
        try {
            setLoading(true);
            const tweetRef = doc(db, "tweets", id);
            await updateDoc(tweetRef, {
                tweet: edittweet,
            });
            //console.log(file);
            if (file) {// if file exsists
                if (photo) {
                    const photoRef = ref(storage, `tweets/${user.uid}-${user.displayName}/${id}`);
                    await deleteObject(photoRef);
                }
                const locationRef = ref( storage, `tweets/${user.uid}-${user.displayName}/${id}`);// use ref
                const result = await uploadBytes(locationRef, file);// use uploadbytes
                const url = await getDownloadURL(result.ref);// use getdownloadurl

                await updateDoc(tweetRef, {
                    photo: url,
                });// use updatedoc
            }// upload photo and set information about photo.
            setEditTweet("");
            setFile(null);
            setPhotourl("");// reset tweet, photo file, temp img url.
        } catch (e) {
            alert(e);// alert error
        } finally {
            window.location.replace("/");// submit 버튼 눌렀을때 새로고침 해서 올린 내용까지 나타내기.
            setLoading(false);
        }
    };// database set to post tweet using addDoc.

    const emojiClicked = () => {
        setEmoji(!emo);
    };// set emoji displayer clicked.

    const onEmojiClick = (event: any) => {
        setEditTweet((prevInput) => prevInput + event.emoji);
    };// add emoji with original tweet text.

    //-------------------edit end-------------------------

    return (
    <>
        <Wrapper>
            <Column>
                {user?.uid === userId ? 
                <MoreBox>
                    <MoreBtn>
                    <svg onClick={() => setIsModalOpen(true)} fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    </MoreBtn>
                    {isModalOpen === true ? <ModalDiv ref={modalref}>
                        <ModalBtn onClick={() => {setIsModalOpen(false), setIsEdit(true), setPhotourl(photo), setEditTweet(tweet)}}>
                            <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            edit
                        </ModalBtn>
                        <ModalBtn onClick={() => {setIsModalOpen(false), onDelete()}} className="del">
                            <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            delete
                        </ModalBtn>
                    </ModalDiv> : null}
                </MoreBox> : null
                }
                <Username>{username} <UserDate>@{username} · {elapsedTime(createdDate)}</UserDate></Username>
                <Payload>{tweet}</Payload>
            </Column>
            {photo ? ( <Column><Photo src={photo} /></Column>) : null}
            <Columnsvg>
                <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                </svg>
                <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                </svg>
                <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
            </Columnsvg>
        </Wrapper>
        {isEdit === true ? 
            <Editbox ref={editref}>
                <Username>{username} <UserDate>@{username} · {elapsedTime(createdDate)}</UserDate></Username>
                <Form onSubmit={onSubmit}>
                    <TextArea
                        rows={5}
                        maxLength={180}
                        onChange={onChange}
                        value={edittweet}
                        placeholder="What is happening?!"
                    />
                    <Imgdiv>
                        <ImgArea src={photourl} />
                    </Imgdiv>
                    <ButtonWrapper>
                        <AttachFileButton htmlFor="editfile">
                        {file ? "Img edited ✅" : 
                            <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                        }
                        </AttachFileButton>
                        <AttachFileButton>
                            <svg onClick={emojiClicked} fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                            </svg>
                            <EmojiBox ref = {emojiref} className={emo === false ? "active" : ""}>
                                <EmojiPicker 
                                onEmojiClick={onEmojiClick}
                                width={300}
                                height={400}
                                skinTonesDisabled
                                emojiStyle={EmojiStyle.TWITTER}
                                theme={Theme.DARK}
                                />
                            </EmojiBox>
                        </AttachFileButton>
                        <AttachFileInput
                            onChange={onFileChange}
                            type="file"
                            id="editfile"
                            accept="image/*"
                        />
                        <SubmitBtn type="submit" value={isLoading ? "Editing..." : "Edit"} />
                    </ButtonWrapper>
                </Form>
            </Editbox> : null
        }
    </>
    );
}
