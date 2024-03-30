import styled from "styled-components";

const Wrapper = styled.div`
    width: 600px;
    border: 2px solid yellow;
`;
export default function Home(){
    return (
        <Wrapper>
            <h1>home</h1>
        </Wrapper>
    );
}