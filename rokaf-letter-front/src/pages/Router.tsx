import { createBrowserRouter } from "react-router-dom";
import Main from "../components/Main";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
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
