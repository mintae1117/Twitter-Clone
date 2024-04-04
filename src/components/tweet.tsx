import { styled } from "styled-components";
import { ITweet } from "./timeline";
import { useState } from "react";
import { useOutsideClick } from "../useOutsideClick";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";


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
`;

const ModalBtn = styled.button`
    cursor: pointer;
    width: 150px;
    height: 40px;
    color: white;
    font-size: 20px;
    background-color: black ;
    border-radius: 10px;
    svg{
        width: 20px;
        margin-right: 10px;
    }
    &.del{
        color: tomato;
    }
`;

export default function Tweet({ username, photo, tweet, createdDate, userId, id }: ITweet) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = auth.currentUser;

    const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    try {
        await deleteDoc(doc(db, "tweets", id));
        if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
        }
    } catch (e) {
        console.log(e);
    } finally {
        window.location.replace("/");// 버튼 눌렀을때 새로고침 해서 올린 내용까지 나타내기.
        //
    }
    };

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

    return (
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
                    <ModalBtn onClick={() => setIsModalOpen(false)}>
                        <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        edit</ModalBtn>
                    <ModalBtn onClick={() => {setIsModalOpen(false), onDelete()}} className="del">
                        <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        delete</ModalBtn>
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
    );
}