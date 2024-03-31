import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import { useState } from "react";


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
    border-left: 1px solid gray;
    border-right: 1px solid gray;
`;

const Header = styled.div`
    height: 52px;
    display: flex;
    border-bottom: 1px solid gray;
    flex-direction: row;
`;

const HeaderBtn = styled.button`
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
    width: 300px;
    color: gray;
    border-color: transparent;
    background-color: rgba(0, 0, 0, 0.8);
    &:hover{
        background-color: rgba(34, 34, 34, 0.8);
    }
`;

export default function Home(){
    const [onwhatPage, setonwhatPage] = useState("foryou");
    const foryouClicked = () => {
        if(onwhatPage === "following"){
            setonwhatPage("foryou");
        }
    }
    const followingClicked = () => {
        if(onwhatPage === "foryou"){
            setonwhatPage("following");
        }
    }// click 된 header 의 onwhatpage state 에 따라 headerbtn active 속성 주기
    return (
        <Wrapper>
            <Header>
                <HeaderBtn onClick={foryouClicked} className={onwhatPage === "foryou" ? "active" : ""}>For you</HeaderBtn>
                <HeaderBtn onClick={followingClicked} className={onwhatPage === "following" ? "active" : ""}>Following</HeaderBtn>
            </Header>
            {onwhatPage === "foryou" ?  <PostTweetForm /> : <h2>following</h2>}
        </Wrapper>
    );
}