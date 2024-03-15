import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

function Main() {
    const { token, setToken, removeToken, getHeaders, name, email } = useUserContext();

    const handleLogout = () => {
        axios.get('http://127.0.0.1:8000/accounts/logout/', getHeaders())
        .then((res) => {
            if(res.status === 204) {
                removeToken();
            }
        })
    }

    // load token from localStorage
    useEffect(()=>{
        const storagedToken = localStorage.getItem("token");
        if (storagedToken !== null) {
            setToken(storagedToken);
        }
    }, []);

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
