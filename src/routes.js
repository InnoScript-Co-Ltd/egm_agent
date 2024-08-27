import { createBrowserRouter } from "react-router-dom";
import { Login } from "./modules/auth/entry/Login";
import { paths } from "./constants/paths";
import { Register } from "./modules/account/entry/Register";
import { Verification } from "./modules/account/entry/Verification";
import { ResendCode } from "./modules/account/entry/ResendCode";
import { Dashboard } from "./modules/dashboard/view/Dashboard";
import { PackageBuy } from "./modules/packages/entry/PackageBuy";
import { BankAccountList } from "./modules/bankAccount/view/BankAccountList";
import { TranscationList } from "./modules/transcation/view/TranscationList";
import { TranscationDetail } from "./modules/transcation/view/TranscationDetail";
import { MainAgentRegister } from "./modules/account/entry/AgentRegister/MainAgentRegister";
import { SubAgentRegister} from "./modules/account/entry/AgentRegister/SubAgentRegister";
import { Profile } from "./modules/account/view/Profile/Profile";
import { AgentList } from "./modules/agent/view/AgentList/AgentList";
import { DepositForm } from "./modules/deposit/entry/DepositForm/DepositForm";
import { AgentDetail } from "./modules/agent/view/AgentDetail/AgentDetail";
import { PackageDetail } from "./modules/packages/view/PackageDetail/PackageDetail";

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: `${paths.mainAgentRegister}/:token`,
        element: <MainAgentRegister />
    },
    {
        path: `${paths.subAgentRegister}/:token`,
        element: <SubAgentRegister />
    },
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
    },
    {
        path: `${paths.package}/:id`,
        element: <PackageDetail />
    },
    {
        path: `${paths.packageBuy}/:id`,
        element: <PackageBuy />
    },
    {
        path: paths.bankAccount,
        element: <BankAccountList />
    },
    {
        path: paths.deposit,
        element: <DepositForm />
    },
    {
        path: paths.transaction,
        element: <TranscationList />
    },
    {
        path: `${paths.transaction}/:id`,
        element: <TranscationDetail />
    },
    {
        path: `${ paths.agent}/:level`,
        element: <AgentList />
    },
    {
        path: `${ paths.agent}/:level/:id`,
        element: <AgentDetail />
    },
    {
        path: paths.profile,
        element: <Profile />
    },

])