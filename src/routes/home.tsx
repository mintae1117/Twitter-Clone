import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
    border: 1px solid gray;
`;

const Header = styled.div`
    height: 52px;
    display: flex;
    border-bottom: 1px solid gray;
    flex-direction: row;
`;

const HeaderBtn = styled.button`
    &.active{
        text-decoration: underline;
        text-underline-offset: 15px;
        text-decoration-thickness: 5px;
        text-decoration-color: #1C9BEF;
        color: white;
    }
    font-size: 15px;
    font-weight: 700;
    width: 300px;
    color: gray;
    border-color: transparent;
    background-color: rgba(0, 0, 0, 0.8);
    &:hover{
        background-color: rgba(34, 34, 34, 0.8);
    }
`;

export default function Home(){
    return (
        <Wrapper>
            <Header>
                <HeaderBtn className="active">For you</HeaderBtn>
                <HeaderBtn>Following</HeaderBtn>
            </Header>
            <PostTweetForm />
        </Wrapper>
    );
}