import styled from "styled-components";

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Text = styled.span`
    font-size: 24px;
`;
// 간단한 로딩 화면 구현
export default function LoadingScreen(){
    return <Wrapper><Text>Loading 𝕏...</Text></Wrapper>;
}