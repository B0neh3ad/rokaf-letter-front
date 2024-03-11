import { FormEventHandler, useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const loginForm = {
            email,
            password
        };
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail: </label>
                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <br />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button type="submit">로그인</button>
            </form>
        </>
    );
}

export default Login;
