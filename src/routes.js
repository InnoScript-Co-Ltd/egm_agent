import { createBrowserRouter } from "react-router-dom";
import { Login } from "./modules/auth/entry/Login";
import { paths } from "./constants/paths";
import { Register } from "./modules/account/entry/Register";
import { Verification } from "./modules/account/entry/Verification";
import { ResendCode } from "./modules/account/entry/ResendCode";
import { Dashboard } from "./modules/dashboard/view/Dashboard";
import { PackageList } from "./modules/packages/view/PackageList";
import { PackageBuy } from "./modules/packages/entry/PackageBuy";
import { BankAccountList } from "./modules/bankAccount/view/BankAccountList";
import { InvestorList } from "./modules/investor/view/InvestorList";
import { CreateInvestor } from "./modules/investor/entry/CreateInvestor";
import { EmailVerification } from "./modules/investor/entry/EmailVerification";
import { InvestorDetail } from "./modules/investor/view/InvestorDetail";
import { TranscationList } from "./modules/transcation/view/TranscationList";
import { TranscationDetail } from "./modules/transcation/view/TranscationDetail";
import { MainAgentRegister } from "./modules/account/entry/AgentRegister/MainAgentRegister";
import { SubAgentRegister} from "./modules/account/entry/AgentRegister/SubAgentRegister";
import { Profile } from "./modules/account/view/Profile/Profile";
import { AgentList } from "./modules/agent/view/AgentList/AgentList";

export const routers = createBrowserRouter([
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
        path: paths.package,
        element: <PackageList />
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
        path: paths.investor,
        element: <InvestorList />
    },
    {
        path: `${paths.investor}/new`,
        element: <CreateInvestor />
    },
    {
        path: paths.investorVerification,
        element: <EmailVerification />
    },
    {
        path: `${paths.investor}/:id`,
        element: <InvestorDetail />
    },
    {
        path: paths.transcation,
        element: <TranscationList />
    },
    {
        path: `${paths.transcation}/:id`,
        element: <TranscationDetail />
    },
    {
        path: `${ paths.agent}/:level`,
        element: <AgentList />
    },
    {
        path: paths.profile,
        element: <Profile />
    }

])