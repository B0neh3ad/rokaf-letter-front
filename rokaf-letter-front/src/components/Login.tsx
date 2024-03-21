import axios from "axios";
import { FormEventHandler, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { Link, Navigate } from 'react-router-dom';

import styles from "../styles/Login.module.css";

function Login() {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const { token, setToken } = useUserContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // Validation
        if (!emailInput) {
            return alert("이메일을 입력하세요.");
        } else if (!passwordInput) {
            return alert("비밀번호를 입력하세요.");
        }

        const loginForm = {
            email: emailInput,
            password: passwordInput
        };

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/accounts/login/`, loginForm)
            .then((res) => {
                if (res.status === 200) {
                    setToken(res.data.token);
                }
            })
            .catch((err) => {
                switch (err.response.status) {
                    case 401:
                        alert('이메일 또는 비밀번호가 잘못되었습니다.');
                        break;

                    default:
                        break;
                }
            });
    }

    return (
        <>
            {token && <Navigate to='/' />}
            <section className={styles.login}>
                <h1>로그인</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">이메일 </label>
                    <input
                        type="email"
                        className={styles.input}
                        name="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                    />
                    <br />

                    <label htmlFor="email">비밀번호 </label>
                    <input
                        type="password"
                        className={styles.input}
                        name="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                    />
                    <br />
                    <button type="submit" className={styles.button}>로그인</button>
                </form>
                <p>
                    처음이신가요?&nbsp;
                    <Link to="/signup">회원가입</Link>
                </p>
            </section>
        </>
    );
}

export default Login;
