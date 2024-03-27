import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { styled } from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
  margin-top: 10px;
  background-color: white;
  font-weight: 500;
  width: 100%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;// github-btn 과 살짝 다름 -> 새로운 tsx 파일 만들기

const Logo = styled.img`
  height: 25px;
`;

export default function GoogleBtn() {
    const navigate = useNavigate();
    const onClick = async () => {
    try {
        const provider = new GoogleAuthProvider();// GoogleAuthProvider 이용하여 간단하게 구글 로그인 추가
        await signInWithPopup(auth, provider);// 팝업창으로 로그인 진행
        navigate("/");
    } catch (error) {
        console.error(error);
    }
    };

    return (
    <Button onClick={onClick}>
        <Logo src="/Googlelogo.svg" />
        Continue with Google
    </Button>
    );
}