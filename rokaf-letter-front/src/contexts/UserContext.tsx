import axios from "axios";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

export type UserContextData = {
    token: string | null,
    setToken: Dispatch<SetStateAction<string | null>>,
    removeToken: () => void,
    getHeaders: () => object,
    
    name: string,
    email: string,
};

export const UserContext = createContext<UserContextData | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const getHeaders = () => {
        return {
            headers:
            token ?
            {
                Authorization: `Token ${token}`
            } : {}
        };
    };

    const removeToken = () => {
        setToken(null);
        localStorage.removeItem("token");
        setName("");
        setEmail("");
    }

    const handleSetToken = () => {
        console.log('current token state:', token);
        console.log('current storaged token:', localStorage.getItem("token"));

        if (token === null) {
            return;
        }
        
        // token 설정하는 경우
        axios.get('http://127.0.0.1:8000/accounts/me/', getHeaders())
        .then((res) => {
            if (res.status === 200) {
                localStorage.setItem("token", token);
                setName(res.data.name);
                setEmail(res.data.email);
            } else {
                // invalid token
                removeToken();
            }
        });
    }
    useEffect(handleSetToken, [token])
 
    const userContextData: UserContextData = {
        token,
        setToken,
        removeToken,
        getHeaders,
        name,
        email,
    };
    
    return (
        <UserContext.Provider value={userContextData}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if(context === undefined) {
        throw new Error("UserContext not Found");
    }
    return context;
};
