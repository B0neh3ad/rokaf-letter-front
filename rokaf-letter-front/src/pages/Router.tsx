import { createBrowserRouter } from "react-router-dom";
import Main from "../components/Main";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import SentLetters from "../components/SentLetters";
import Trainees from "../components/Trainees";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/sent',
                element: <SentLetters />,
            },
            {
                path: '/trainees',
                element: <Trainees />,
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <SignUp />
    },
]);

export default Router;
