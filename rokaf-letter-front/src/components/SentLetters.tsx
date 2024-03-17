import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";

type letterListElement = {
    id: number,
    title: string,
    content: string,
    sender: number,
    status: number,
}

function sentLetters() {
    const {token, getHeaders} = useUserContext();
    const [letters, setLetters] = useState<letterListElement[]>([]);

    useEffect(()=>{
        if (token === null) {
            return;
        }

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/letters`, getHeaders())
        .then((res) => {
            console.log(res.data);
            // TODO: parse res.data and save it in 'letters'
        })
    }, []);

    return (
        // TODO: display 'letters'
        <>
            <ul>
                {letters.map(letter => (
                    <li key={letter.id}>
                        <h3>제목: {letter.title}</h3>
                        <p>{letter.content}</p>
                        <p>현재 상태: {letter.status}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default sentLetters;
