import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { styled } from "styled-components";
import { auth, db } from "../firebase";
import EmojiPicker from 'emoji-picker-react';// add and learn emoji-picker 2024-03-31

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 20px;
    margin-right: 20px;// 왼쪽 오른쪽 공백
`;

const TextArea = styled.textarea`
    border: 2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 21px;
    color: white;
    background-color: black;
    width: 100%;
    height: 100px;
    resize: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    &::placeholder {
    font-size: 21px;
    }
    &:focus {
    outline: none;
    border-color: #1C9BEF;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const AttachFileButton = styled.label`
    padding: 10px 10px 10px 10px;
    color: #1C9BEF;
    cursor: pointer;
    svg{
        width: 20px;
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
    width: 70px;
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

export default function PostTweetForm() {
    const [isLoading, setLoading] = useState(false);
    const [tweet, setTweet] = useState("");
    const [emo, setEmoji] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value);
    };
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
        setFile(files[0]);
    }
    };// make tweet form submit

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user || isLoading || tweet === "" || tweet.length > 200) return;
        try {
            setLoading(true);
            await addDoc(collection(db, "tweets"), {
            tweet,// tweet form
            createdAt: Date.now(),// date
            username: user.displayName || "Anonymous",// if no username
            userId: user.uid,// id of user
            });
        } catch (e) {
            alert(e);// alert error
        } finally {
            setLoading(false);
        }
    };// database set to post tweet using addDoc.

    const emojiClicked = () => {
        setEmoji(!emo);
    };// set emoji displayer clicked.

    const onEmojiClick = (event: any) => {
        setTweet((prevInput) => prevInput + event.emoji);
    };// add emoji with original tweet text.

    return (
        <Form onSubmit={onSubmit}>
            <TextArea
                className="input-style"
                rows={5}
                maxLength={180}
                onChange={onChange}
                value={tweet}
                placeholder="What is happening?!"
            />
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
                    <EmojiPicker onEmojiClick={onEmojiClick} theme="dark" emojiStyle="twitter" />
                </EmojiBox>
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
    );
}