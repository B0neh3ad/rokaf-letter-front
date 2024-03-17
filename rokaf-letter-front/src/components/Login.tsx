import axios from "axios";
import { FormEventHandler, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { Link, Navigate } from 'react-router-dom';

import styles from "../styles/login.module.css";

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
            <div className={styles.formWrapper}>
                <h1>로그인</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className={styles.input}
                        name="email"
                        placeholder="이메일"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                    />
                    <br />
                    <input
                        type="password"
                        className={styles.input}
                        name="password"
                        placeholder="비밀번호"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                    />
                    <br />
                    <button type="submit" className={styles.button}>로그인</button>
                </form>
            </div>
            <Link to="/signup">회원가입</Link>
        </>
    );
}

export default Login;
