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
  };
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
  };

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
    };

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
        </Switcher> : null}
        <Switcher>
        Don't have an account?{" "}
        <Link to="/create-account">Create account &rarr;</Link>
        </Switcher>
        <GithubButton />
        <GoogleBtn />
    </Wrapper>
  );
}