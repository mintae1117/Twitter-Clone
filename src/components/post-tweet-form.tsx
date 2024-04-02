import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { styled } from "styled-components";
import { auth, db, storage } from "../firebase";
import EmojiPicker from 'emoji-picker-react';// add and learn emoji-picker 2024-03-31
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const FormWrapper = styled.div`
    border-bottom: 0.5px solid gray;
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
`;

const AttachFileButton = styled.label`
    padding: 10px 10px 12px 10px;
    color: #1C9BEF;
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
    &.active{
        display: none;
    }
`;

const Imgdiv = styled.div`
    position: relative;
    width: 70%;
`;

const ImgArea = styled.img`
    width: 100%;
    border-radius: 5px;
`;

const Imgdeletebtn = styled.button`
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 20px;
    align-items: center;
    background-color: rgba(66, 66, 66, 0.85);
    color: white;
    cursor: pointer;
    border-color: transparent;
    border-radius: 50%;
    &:hover{
        background-color: rgba(158, 158, 158, 0.85);
    }
`;


export default function PostTweetForm() {
    const [isLoading, setLoading] = useState(false);
    const [tweet, setTweet] = useState("");
    const [emo, setEmoji] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [photourl,  setPhotourl] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value);
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        const maxfilesize = 1 * 1024 * 1024;// file 크기 제한 1mb
        if (files && files.length === 1) {
            if(files && files[0].size > maxfilesize){
                alert("File size is too big. maximun file size is 1mb");
                return;
            }// filesize가 1mb 보다 크면 alert 띄우고 return.
            setFile(files[0]);
            const newimgsrc = URL.createObjectURL(files[0]);
            setPhotourl(newimgsrc);// 고른 이미지의 url 생성해서 보여주기용으로 보냄.
        }
    };// read tweet file form onchange.

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user || isLoading || tweet === "" || tweet.length > 200) return;
        try {
            setLoading(true);
            const doc = await addDoc(collection(db, "tweets"), {
            tweet,// tweet submitted form
            createdAt: Date.now(),// date
            username: user.displayName || "Anonymous",// if no username
            userId: user.uid,// id of user
            });
            //console.log(file);
            if (file) {// if file exsists
                const locationRef = ref(
                    storage,
                    `tweets/${user.uid}-${user.displayName}/${doc.id}`
                );
                const result = await uploadBytes(locationRef, file);
                const url = await getDownloadURL(result.ref);
                await updateDoc(doc, {
                    photo: url,
                });
            }// upload photo and set information about photo.
            setTweet("");
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
        setTweet((prevInput) => prevInput + event.emoji);
    };// add emoji with original tweet text.

    const onLocationClick = () => {
        window.open("https://www.google.com/maps/?entry=ttu");
    };// open google map if map icon clicked.

    const onPlannerClick = () => {
        window.open("https://mintae1117.github.io/Javascript-Todo-App/");
    };// open my js planner if planner icon clicked.

    const onimgdeleteClick = () => {
        setFile(null);
        setPhotourl("");
    };// photo file, temp img url reset.
    return (
        <FormWrapper>
            <Form onSubmit={onSubmit}>
                <TextArea
                    rows={5}
                    maxLength={180}
                    onChange={onChange}
                    value={tweet}
                    placeholder="What is happening?!"
                />
                <Imgdiv>
                    <ImgArea src={photourl} />
                    { photourl === "" ? null : <Imgdeletebtn onClick={onimgdeleteClick}>X</Imgdeletebtn>}
                </Imgdiv>
                <ButtonWrapper>
                    <AttachFileButton htmlFor="file">
                    {file ? "Photo added ✅" : 
                        <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    }
                    </AttachFileButton>
                    <AttachFileButton>
                        <svg onClick={emojiClicked} fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                        </svg>
                        <EmojiBox className={emo === false ? "active" : ""}>
                            <EmojiPicker 
                            onEmojiClick={onEmojiClick}
                            width={300}
                            height={400}
                            skinTonesDisabled
                            />{/* theme="dark" emojiStyle="twitter" 얘네 넣으면 왜 에러 나는건지 전혀 모르겠음... 넣어도 코드는 잘돌아감. */}
                        </EmojiBox>
                    </AttachFileButton>
                    <AttachFileButton>
                        <svg onClick={onPlannerClick} fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                    </AttachFileButton>
                    <AttachFileButton>
                        <svg onClick={onLocationClick} fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                    </AttachFileButton>
                    <AttachFileInput
                        onChange={onFileChange}
                        type="file"
                        id="file"
                        accept="image/*"
                    />
                    <SubmitBtn
                        type="submit"
                        value={isLoading ? "Posting..." : "Post"}
                    />
                </ButtonWrapper>
            </Form>
        </FormWrapper>
    );
}