import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

function Main() {
    const { token, setToken, removeToken, getHeaders, name, email } = useUserContext();

    const handleLogout = () => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/accounts/logout/`, getHeaders())
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
            { !token ? <Navigate to="/login" /> : <Navigate to="/sent" /> } 
            <p>{`${name}(${email})님 환영합니다!`}</p>
            <button onClick={handleLogout}>로그아웃</button>
            <nav>
                <ul>
                    <li><NavLink to="/sent">작성한 편지들</NavLink></li>
                    <li><NavLink to="/trainees">훈련병 목록</NavLink></li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}

export default Main;
