import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { FormEventHandler, useState } from "react";
import axios from "axios";

// TODO: 주소 입력 구현하기

function SignUp() {
    const { token } = useUserContext();

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [password2Input, setPassword2Input] = useState("");

    const [nameInput, setNameInput] = useState("");

    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // Validation
        if (!emailInput) {
            return alert("이메일을 입력하세요.");
        } else if (!passwordInput) {
            return alert("비밀번호를 입력하세요.");
        } else if (!password2Input) {
            return alert("비밀번호를 한 번 더 입력하세요.");
        } else if (!nameInput) {
            return alert("이름을 입력하세요.");
        }

        if (passwordInput !== password2Input) {
            return alert("비밀번호가 서로 일치하지 않습니다.");
        }

        const signUpForm = {
            email: emailInput,
            password: passwordInput,
            password2: password2Input,
            name: nameInput,
        };

        axios.post("http://localhost:8000/accounts/signup/", signUpForm)
            .then((res) => {
                if (res.status === 201) {
                    alert("회원가입에 성공했습니다!");
                    setSignUpSuccess(true);
                }
            })
            .catch((err) => {
                switch (err.response.status) {
                    case 400:
                        var alertMessage = "";
                        Object.entries(err.response.data).map(([field, errorMessages]) => {
                            alertMessage += `[${field}]\n${errorMessages.join('\n')}\n`;
                        })
                        alert(alertMessage);
                        break;

                    default:
                        break;
                }
            })
    };

    return (
        <>
            {token && <Navigate to='/' />}
            {signUpSuccess && <Navigate to='/' />}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">이메일 </label>
                <input type="email" name="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                <br />

                <label htmlFor="password">비밀번호 </label>
                <input type="password" name="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
                <br />

                <label htmlFor="password2">비밀번호 재입력 </label>
                <input type="password" name="password2" value={password2Input} onChange={(e) => setPassword2Input(e.target.value)} />
                <br />

                <label htmlFor="name">이름 </label>
                <input type="text" name="name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
                <br />

                <button type="submit">회원가입</button>
            </form>
        </>
    );
}

export default SignUp;
