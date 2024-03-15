import axios from "axios";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

export type UserContextData = {
    token: string | null,
    setToken: Dispatch<SetStateAction<string | null>>,
    getHeaders: (token: string | null) => object,
    
    name: string,
    email: string,
};

export const UserContext = createContext<UserContextData | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const getHeaders = (tokenInput: string | null) => {
        return { Authorization: `Token ${tokenInput}` };
    };

    useEffect(() => {
        console.log(token);

        // token 제거하는 경우
        if (token === null) {
            setName("");
            setEmail("");
            return;
        }
        
        // token 설정하는 경우
        axios.get('http://127.0.0.1:8000/accounts/me/', {headers: getHeaders(token)})
        .then((res) => {
            if (res.status === 200) {
                setName(res.data.name);
                setEmail(res.data.email);
            } else {
                alert('먼가 잘못됨;;');
            }
        });
    }, [token])
 
    const userContextData: UserContextData = {
        token,
        setToken,
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
