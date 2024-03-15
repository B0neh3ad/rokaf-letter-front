import axios from "axios";
import { FormEventHandler, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { Link, Navigate } from 'react-router-dom';

function Login() {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const { token, setToken, getHeaders } = useUserContext();

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

        axios.post("http://localhost:8000/accounts/login/", loginForm)
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
            { token && <Navigate to='/' /> }
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail </label>
                <input type="email" name="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)}/>
                <br />
                <label htmlFor="password">Password </label>
                <input type="password" name="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
                <br />
                <button type="submit">로그인</button>
            </form>
            <Link to="/signup">회원가입</Link>
        </>
    );
}

export default Login;
