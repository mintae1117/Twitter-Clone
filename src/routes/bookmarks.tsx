import styled from "styled-components";

export const MyDiv = styled.div`
    align-items: center;
    align-content: center;
    text-align: center;
    width: 100%;
`;

export const Sorry = styled.h3`
    font-size: 30px;
`;


export default function Bookmarks(){
    return (
        <MyDiv>
            <Sorry>Bookmarks</Sorry>
        </MyDiv>
    );
}