import axios from "axios";
import { ReactNode, createContext, useContext, useState } from "react";

export type Headers = {
    Authorization: string,
};

export type UserContextData = {
    headers: Headers,
    handleToken: (token: string | null) => void,
    
    name: string,
    email: string,
};

export const UserContext = createContext<UserContextData | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [headers, setHeaders] = useState<Headers>({Authorization:""});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleToken = (token: string | null) => {
        // token 제거하는 경우
        if(token === null){
            setName("");
            setEmail("");
            return;
        }
        
        // token 설정하는 경우
        console.log(token);
        const newHeaders: Headers = {...headers, Authorization: `Token ${token}`};
        setHeaders(newHeaders)
        axios.get('http://127.0.0.1:8000/accounts/me/', {headers})
        .then((res) => {
            if (res.status === 200) {
                setName(res.data.name);
                setEmail(res.data.email);
            } else {
                alert('먼가 잘못됨;;');
            }
        });
    };
 
    const userContextData: UserContextData = {
        headers,
        handleToken,
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
