import styled from "styled-components";

const Notreadydiv = styled.div`
    align-items: center;
    align-content: center;
    text-align: center;
    width: 100%;
`;

const Sorry = styled.h3`
    font-size: 30px;
`;

const NotreadyImg = styled.img`
    width: 100%;
    max-width: 600px;
    content: url("https://media.licdn.com/dms/image/C4E12AQHAU3M2RJNOkQ/article-cover_image-shrink_600_2000/0/1535019170814?e=2147483647&v=beta&t=578jvc8EKYGUFgTxhSYdlNmEeydDodjMinsPrzo4Yfw");
    border-radius: 40px;
    padding: 20px;
`;

export default function Profile(){
    return(
        <Notreadydiv>
            <NotreadyImg/>
            <Sorry>Sorry... not ready yet!</Sorry>
            <Sorry>We are still working on this part!!</Sorry>
        </Notreadydiv>
    );
    //return <h1>sorry... not ready yet!<br></br>We are still working on this part!!</h1>;
}