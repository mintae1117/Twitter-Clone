import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { styled } from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
  margin-top: 40px;// 위 쫌더 띄우기
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
    transition-duration: 0.3s;
    opacity: 0.8;
  }
`;

const Logo = styled.img`
  height: 25px;
`;

export default function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();// GithubAuthProvider 이용하여 간편하게 깃헙 로그인 추가.
      await signInWithPopup(auth, provider);// 팝업창으로 로그인 진행
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error);// error 발생시 alert 문구 표시.
    }
  };
  return (
    <Button onClick={onClick}>
      <Logo src="/github-mark.svg" />
      Continue with Github
    </Button>
  );
}