import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Form,
  Error,
  Input,
  Switcher,
  Title,
  Wrapper,
  Forgotpassword,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";
import GoogleBtn from "../components/google-btn";
import styled from "styled-components";
import Footer from "../components/footer";

const TitleX = styled.h2`
    font-size: 100px;
`;

export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
        target: { name, value },
        } = e;
        if (name === "name") {
        setName(value);
        } else if (name === "email") {
        setEmail(value);
        } else if (name === "password") {
        setPassword(value);
        }
    };//form 의 name, value 를 가져와서 name, email, password 에 넣어준다

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (isLoading || name === "" || email === "" || password === "") return;
        try {
            setLoading(true);
            const credentials = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(credentials.user);
            await updateProfile(credentials.user, {
                displayName: name,
            });
            navigate("/");
        } catch (e) {
            if (e instanceof FirebaseError) {
                setError(e.message);
            }
        // setError
        } finally {
        setLoading(false);
        }
    };
    // create an account.
    // set the name of the user.
    // redirect to the home page.
    const onClick = async () => {
        await sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            alert("Password reset email sent!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            alert(errorMessage);
            // error 메세지 alert
        });
    };// 비밀번호 틀리거나 이미 생성된 이메일의 계정에서 표시, 클릭하면 password reset email 보내기.

    return (
        <>
        <Wrapper>
            <TitleX>𝕏</TitleX>
            <Title>Create account</Title>
            <Form onSubmit={onSubmit}>
                <Input
                    onChange={onChange}
                    name="name"
                    value={name}
                    placeholder="Name"
                    type="text"
                    required
                />
                <Input
                    onChange={onChange}
                    name="email"
                    value={email}
                    placeholder="Email"
                    type="email"
                    required
                />
                <Input
                    onChange={onChange}
                    value={password}
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                />
                <Input
                    type="submit"
                    value={isLoading ? "Loading..." : "Create Account"}
                />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            {error !== "" ? <Switcher>
            Forgot your email login password?
            <Forgotpassword onClick={onClick}>Send password reset email &rarr;</Forgotpassword>
            </Switcher> : null/*이메일 비번 입력 시 error 발생 하면 문구 띄우기*/}
            <Switcher>
                Already have an account? <Link to="/login">Log in &rarr;</Link>
            </Switcher>
            <GithubButton />
            <GoogleBtn />
        </Wrapper>
        <Footer />
        </>
    );
}