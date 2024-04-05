import styled from "styled-components";


const RightSearch = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    svg{
        position: absolute;
        left: 47px;
        top: 17px;
        width: 20px;
        color: gray;
    }
`;

const SearchBar = styled.input`
    padding-left: 60px;
    color: white;
    font-size: 15px;
    margin-left: 30px;
    margin-top: 5px;
    width: 85%;
    height: 45px;
    max-width: 350px;
    border: transparent;
    border-radius: 50px;
    background-color: #202327;
    outline: none;
`;

const RightSubBox = styled.div`
    background-color: #16181C;
    max-width: 350px;
    width: 85%;
    height: auto;
    min-height: 145px;
    padding-top: 10px;
    padding-left: 15px;
    border-radius: 15px;
    h3{
        font-weight: 800;
        font-size: 20px;
        margin-bottom: 15px;
    }
    p{
        color: gray;
    }
`;

const SubmitBtn = styled.button`
    background-color: #1d9bf0;
    width: 120px;
    height: 40px;
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    float: left;
    margin-top: 15px;
    margin-bottom: 15px;
    cursor: pointer;
    &:hover{
    background-color: #1887d1;
    }
`;

const RightTrendBox = styled.div`
    background-color: #16181C;
    max-width: 350px;
    width: 85%;
    height: auto;
    min-height: 300px;
    padding-top: 10px;
    padding-left: 15px;
    border-radius: 15px;
    h3{
        font-weight: 800;
        font-size: 20px;
        margin-bottom: 15px;
    }
    p{
        color: gray;
    }
`;

const RightFollowBox = styled.div`
    background-color: #16181C;
    max-width: 350px;
    width: 85%;
    height: auto;
    min-height: 200px;
    padding-top: 10px;
    padding-left: 15px;
    border-radius: 15px;
    h3{
        font-weight: 800;
        font-size: 20px;
        margin-bottom: 15px;
    }
    p{
        color: gray;
    }
`;

export default function RightBar(){
    return (
        <>
        <RightSearch>
            <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <SearchBar placeholder="Search"></SearchBar>
        </RightSearch>
        <RightSubBox>
            <h3>Subscribe to Premium</h3>
            <p>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
            <SubmitBtn>Subscribe</SubmitBtn>
        </RightSubBox>
        <RightTrendBox>
            <h3>Trends for you</h3>
            <p>Not ready yet.</p>
        </RightTrendBox>
        <RightFollowBox>
            <h3>Who to follow</h3>
            <p>Not ready yet.</p>
        </RightFollowBox>
        </>
    );
}