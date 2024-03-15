import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

function Main() {
    const { token, setToken, getHeaders, name, email } = useUserContext();

    const handleLogout = () => {
        axios.get('http://127.0.0.1:8000/accounts/logout/', {headers: getHeaders(token)})
        .then((res) => {
            if(res.status === 204) {
                setToken(null);
            }
        })
    }

    return (
        <>            
            { !token && <Navigate to="/login" /> }
            <p>{`${name}(${email})님 환영합니다!`}</p>
            <button onClick={handleLogout}>로그아웃</button>
            <Outlet />
        </>
    );
}

export default Main;
