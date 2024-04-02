import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
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

const Header = styled.div`
    position: sticky;
    top: 0px;
    height: 52px;
    display: flex;
    border-bottom: 0.5px solid gray;
    flex-direction: row;
    z-index: 10;// 충분한 크기의 z index 주기 (최상단 표시).
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
    width: 100%;
    max-width: 600px;
    color: gray;
    border-color: transparent;
    background-color: rgba(0, 0, 0, 0.85);
    &:hover{
        background-color: rgba(34, 34, 34, 0.8);
    }
`;

const Letterdiv = styled.div`
    padding: 120px;
    width: 100%;
    height: 1200px;
    align-items: center;
    align-content: center;
`;

const Letterdiv2 = styled.div`
    width: 100%;
    height: 300px;
    margin-top: -500px;
    align-items: center;
    align-content: center;
`;

const BigLetter = styled.h3`
    font-size: 35px;
    color: white;
    margin-bottom: 10px;
`;

const SmallLetter = styled.p`
    font-size: 15px;
    color: gray;
`;

export default function Home(){
    const [onwhatPage, setonwhatPage] = useState("all");
    const allClicked = () => {
        if(onwhatPage !== "all"){
            setonwhatPage("all");
        }
    };
    const veriClicked = () => {
        if(onwhatPage !== "veri"){
            setonwhatPage("veri");
        }
    };
    const mentionClicked = () => {
        if(onwhatPage !== "mention"){
            setonwhatPage("mention");
        }
    };

    return (
        <Wrapper>
            <Header>
                <HeaderBtn onClick={allClicked} className={onwhatPage === "all" ? "active" : ""}>All</HeaderBtn>
                <HeaderBtn onClick={veriClicked} className={onwhatPage === "veri" ? "active" : ""}>Verified</HeaderBtn>
                <HeaderBtn onClick={mentionClicked} className={onwhatPage === "mention" ? "active" : ""}>Mentions</HeaderBtn>
            </Header>
            <Letterdiv>
                {(onwhatPage === "all") ? 
                    <Letterdiv2>
                        <BigLetter>All<br></br>Nothing to see here — yet</BigLetter>
                        <SmallLetter>From likes to reposts and a whole lot more, this is where all the action happens.</SmallLetter>
                    </Letterdiv2>
                    : (onwhatPage === "veri") ? 
                    <Letterdiv2>
                        <BigLetter>Verified<br></br>Nothing to see here — yet</BigLetter>
                        <SmallLetter>From likes to reposts and a whole lot more, this is where all the action happens.</SmallLetter>
                    </Letterdiv2>
                    : (onwhatPage === "mention") ? 
                    <Letterdiv2>
                        <BigLetter>Mentions<br></br>Nothing to see here — yet</BigLetter>
                        <SmallLetter>From likes to reposts and a whole lot more, this is where all the action happens.</SmallLetter>
                    </Letterdiv2>
                    : null
                }
            </Letterdiv>
        </Wrapper>
    );
}