import axios from "axios";
import { FormEventHandler, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { Navigate } from 'react-router-dom';

function Login() {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const { token, setToken } = useUserContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
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
            switch (res.status) {
                case 200:
                    setToken(res.data.token);
                    break;
                
                case 401:
                    alert("이메일 또는 비밀번호가 틀렸습니다.");
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
                <label htmlFor="email">E-mail: </label>
                <input type="text" name="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)}/>
                <br />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
                <br />
                <button type="submit">로그인</button>
            </form>
        </>
    );
}

export default Login;
