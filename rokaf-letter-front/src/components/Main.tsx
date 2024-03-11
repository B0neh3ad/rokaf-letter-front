import axios from "axios";
import { useUserContext } from "../contexts/UserContext";

function Main() {
    const { handleToken, name, email } = useUserContext();

    const handleLogout = () => {
        axios.post('http://127.0.0.1:8000/accounts/logout')
        .then((res) => {
            if(res.status === 204) {
                handleToken(null);
            }
        })
    }

    return (
        <>
            {`${name}(${email})님 환영합니다!`}
            <button onClick={handleLogout}>로그아웃</button>
        </>
    );
}

export default Main;
