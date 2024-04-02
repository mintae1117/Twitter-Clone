import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Notready from "./routes/notready"
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";
import Explore from "./routes/explore";
import Notification from "./routes/notifications";
import Message from "./routes/messages";
import Lists from "./routes/lists";
import Bookmark from "./routes/bookmarks";
import Community from "./routes/communities"

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),//protected-route를 통한 home, profile pages 보호. 로그인 되지 않으면 설정 페이지로 이동.
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
      {
        path: "notifications",
        element: <Notification />,
      },
      {
        path: "messages",
        element: <Message />,
      },
      {
        path: "lists",
        element: <Lists />,
      },
      {
        path: "bookmarks",
        element: <Bookmark />,
      },
      {
        path: "communities",
        element: <Community />,
      },
      {
        path: "notready",
        element: <Notready />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);// router setting, 라우터를 layout + outlet으로 render하고 새로운 route로 이동하기 위한 세팅

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;// styled reset 을 이용한 globalstyle reset -> 개편함, 글로벌스타일 추가가능

function App() {
  const[isLoading, setLoading] = useState(true);// 파이어 베이스가 유저 채크를 위한 로딩화면 셋 스테이트
  const init = async() =>{
    await auth.authStateReady();// wait fot firebase, 파이어베이스 유저 확인 작업 기다리기
    setLoading(false);
  }
  useEffect(() => {init()}, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router}/>}
    </Wrapper>
  );
}

export default App
