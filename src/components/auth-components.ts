import { styled } from "styled-components";

// styled components of auth related pages.
export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 150px 0px;
  @media (max-width: 700px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export const Title = styled.h2`
  font-size: 42px;
`;

export const Xtitle = styled.h1`
  font-size: 500px;
  padding: 180px 320px 0 0;
  @media (max-width: 1150px){
    font-size: 100px;
    padding: 0px;
    margin-bottom: -100px;
  }
`;

export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
padding: 10px 20px;
border-radius: 5px;
border: none;
width: 100%;
font-size: 16px;
min-width: 200px;
&[type="submit"] {
    margin-top: 10px;
    border-radius: 50px;
    color: white;
    background-color: #1C9BEF;
    cursor: pointer;
    &:hover {
        transition-duration: 0.3s;
        opacity: 0.8;
    }
}
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d9bf0;
    &:hover {
        transition-duration: 0.3s;
        opacity: 0.8;
    }
  }
`;

export const Forgotpassword = styled.p`
    color: #1d9bf0;
    text-decoration: underline;
    cursor: pointer;
    &:hover {
        transition-duration: 0.3s;
        opacity: 0.8;
    }
`;
