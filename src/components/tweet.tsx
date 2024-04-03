import { styled } from "styled-components";
import { ITweet } from "./timeline";
import { useState } from "react";
import { useOutsideClick } from "../useOutsideClick";


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
    width: 100px;
    height: 100px;
    border: 1px solid red;
    background-color: gray;
`

const Payload = styled.p`
    margin: 10px 0px;
    font-size: 18px;
`;

export default function Tweet({ username, photo, tweet, createdDate }: ITweet) {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        if (days < 7) return `${Math.floor(days)}day`;
    
        return `${start.toLocaleDateString()}`;
    };// 몇분 몇시간 몇일 전인지.

    const ref = useOutsideClick(() => {
        setIsModalOpen(false);
    });// modal outside click ref

    return (
    <Wrapper>
        <Column>
            <MoreBox>
                <MoreBtn>
                <svg onClick={() => setIsModalOpen(true)} fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                </MoreBtn>
                {isModalOpen === true ? <ModalDiv ref={ref}>del and re</ModalDiv> : null}
            </MoreBox>
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