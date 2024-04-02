import { styled } from "styled-components";


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
    cursor: pointer;
    font-size: 15px;
    font-weight: 300;
    width: 100%;
    color: white;
    border-color: transparent;
    background-color: rgba(0, 0, 0, 0.85);
`;


export default function Profile(){
    return (
        <Wrapper>
            <Header>
                <HeaderBtn >김민태</HeaderBtn>
            </Header>
        </Wrapper>
    );
}