import { createBrowserRouter } from "react-router-dom";
import { Login } from "./modules/auth/entry/Login";
import { paths } from "./constants/paths";
import { Register } from "./modules/account/entry/Register";
import { Verification } from "./modules/account/entry/Verification";
import { ResendCode } from "./modules/account/entry/ResendCode";
import { Dashboard } from "./modules/dashboard/view/Dashboard";

export const routers = createBrowserRouter([
    {
        path: paths.login,
        element: <Login />
    },
    {
        path: paths.register,
        element: <Register />
    },
    {
        path: paths.verification,
        element: <Verification />
    },
    {
        path: paths.resendCode,
        element: <ResendCode />
    },
    {
        path: paths.dashboard,
        element: <Dashboard />
    }
])