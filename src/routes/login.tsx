import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Xtitle,
  Wrapper,
  Forgotpassword,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";
import GoogleBtn from "../components/google-btn";

export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
        target: { name, value },
    } = e;
    if (name === "email") {
        setEmail(value);
    } else if (name === "password") {
        setPassword(value);
    }
    };// 아이디(이메일), 비번 입력받기

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
    } catch (e) {
        if (e instanceof FirebaseError) {
        setError(e.message);
        }
    } finally {
        setLoading(false);
    }
    };// firebase signInWithEmailAndPassword 이용하여 사용자 로그인 시키기, loading setting 해주기.

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
        // ..
    });
    };// 비밀번호 틀리거나 이미 생성된 이메일의 계정에서 표시, 클릭하면 password reset email 보내기.

    return (
    <Wrapper>
        <Xtitle>𝕏</Xtitle>
        <Title>Log in</Title>
        <Form onSubmit={onSubmit}>
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
        <Input type="submit" value={isLoading ? "Loading..." : "Log in"} />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        {error !== "" ? <Switcher>
            Forgot your email login password?
            <Forgotpassword onClick={onClick}>Send password reset email &rarr;</Forgotpassword>
        </Switcher> : null/*이메일 비번 입력 시 error 발생 하면 문구 띄우기*/}
        <Switcher>
        Don't have an account?{" "}
        <Link to="/create-account">Create account &rarr;</Link>
        </Switcher>
        <GithubButton />
        <GoogleBtn />
    </Wrapper>
    );
}