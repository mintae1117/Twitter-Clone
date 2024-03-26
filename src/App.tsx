import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";

//router setting, 라우터를 layout + outlet으로 render하고 새로운 페이지로 이동하기 위한 세팅
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
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
]);

//styled reset 을 이용한 globalstyle reset -> 개편함!, 글로벌 스타일 추가
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
`;

function App() {
  const[isLoading, setLoading] = useState(true);//set state to check loading, 파이어 베이스가 유저 채크를 위한 로딩화면 셋 스테이트
  const init = async() =>{
    //wait fot firebase, 파이어베이스 유저 확인 작업 기다리기
    setLoading(false);
  }
  useEffect(() => {init()}, []);

  return (
    <>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router}/>}
    </>
  );
}


export default App
