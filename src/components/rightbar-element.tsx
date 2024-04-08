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
    min-height: 450px;
    padding-top: 10px;
    padding-left: 15px;
    padding-right: 10px;
    border-radius: 15px;
    h3{
        font-weight: 800;
        font-size: 20px;
        margin-bottom: 15px;
    }
    p{
        color: gray;
        line-height: 120%;
        margin-bottom: 10px;
    }
`;

const RightFollowBox = styled.div`
    background-color: #16181C;
    max-width: 350px;
    width: 85%;
    height: auto;
    min-height: 150px;
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
            <SubmitBtn onClick={()=>window.open("https://github.com/mintae1117")}>Subscribe</SubmitBtn>
        </RightSubBox>
        <RightTrendBox>
            <h3>⭐️ 사용 가능 기능, 디자인. ⭐️</h3>
            <p>1. 로그인 페이지 : 비번 틀릴시 리셋 이메일 전송 여부 표시, 구글과 깃헙 로그인, 문제 발생 시 error 표시.</p>
            <p>2. 계정생성 페이지 : 이메일 이용한 간단한 계정생성, 계정 존재시 리셋 이메일 전송 여부 표시, 구글과 깃헙 계정사용, 각 단계별 문제 발생 시 error 표시.</p>
            <p>3. 홈 페이지 : 게시물 작성, 사진첨부, 첨부사진 표시, 첨부사진 삭제, 이모티콘 기입, 게시글 권한 식별, 권한 게시글 삭제, 권한 게시글 수정, 게시물 만든 시간 표시(just now,m,h,d...), 게시물 작성자 이름 표시, 사진용량 제한.</p>
            <p>4. 프로필 페이지 : 프로필 사진,배경사진,이름 업로드 및 수정 가능, user info, user timeline 표시, 사진용량 제한 및 파일 변환 확인.</p>
            <p>5. styled-component를 이용한 반응형 css, 원본 사이트와 최대한 동일한 UI로 구현.</p>
        </RightTrendBox>
        <RightFollowBox>
            <h3>Who to follow</h3>
            <p>Not ready yet.</p>
        </RightFollowBox>
        </>
    );
}