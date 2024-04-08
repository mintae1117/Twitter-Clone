import { styled } from "styled-components";

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

const Name = styled.span`
    font-size: 20px;
    font-weight: 700;
`;

const FancyBox = styled.div`
    display: flex;
    flex-direction: column;
    height: 220px;
    width: 100%;
    max-width: 600px;
    padding: 20px;
    gap: 30px;
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

export default function fancyprofile(){
    return (
        <>
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
        </>
    );
}