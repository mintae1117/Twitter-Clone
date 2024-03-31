import styled from "styled-components";

const Myfooter = styled.h3`
    position: fixed;
    top: 97%;
    width: 100%;
    text-align: center;
    color: #5e5e5e;
    font-size: 15px;
    cursor: pointer;
`;

const gotoYoutube = () => {
    window.open("https://www.youtube.com/");
}

export default function Footer(){
    return(
        <Myfooter onClick={gotoYoutube}>Footer 만들기 너무 너무 귀찮습니다. 정말 정말 귀찮습니다. 정신이 나갈 것 같습니다. 지금은 새벽 4시 입니다. <span style={{color:"tomato"}}>유튜브</span>나 보러 가겠습니다. 다들 행복하시길 바랍니다.</Myfooter>
    );
}