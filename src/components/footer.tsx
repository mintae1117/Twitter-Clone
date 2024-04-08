import styled from "styled-components";

const Myfooter = styled.h3`
    position: fixed;
    top: 97%;
    width: 100%;
    text-align: center;
    color: #5e5e5e;
    font-size: 15px;
    @media (max-width: 1150px) {
        display: none;
    }
`;// footer css form

const gotoYoutube = () => {
    window.open("https://www.youtube.com/");
}// link to youtube

const gotoGithub = () => {
    window.open("https://github.com/mintae1117");
}// link to github

export default function Footer(){
    return(
        <Myfooter>Footer 만들기 너무 너무 귀찮습니다.
        <span onClick={gotoYoutube} style={{color:"tomato", cursor: "pointer"}}> 유튜브</span>나 보러 갑시다.
        This site has nothing to do with twitter, it's just a clone codding site.
        @copyright <span onClick={gotoGithub} style={{color:"white", cursor: "pointer"}}>mintaekim</span> all rights reserved.</Myfooter>
    );
}