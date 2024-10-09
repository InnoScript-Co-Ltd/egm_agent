import { createBrowserRouter } from "react-router-dom";
import { Login } from "./modules/auth/entry/Login";
import { paths } from "./constants/paths";
import { Verification } from "./modules/account/entry/Verification";
import { ResendCode } from "./modules/account/entry/ResendCode";
import { Dashboard } from "./modules/dashboard/view/Dashboard";
import { PackageBuy } from "./modules/packages/entry/PackageBuy";
import { BankAccountList } from "./modules/bankAccount/view/BankAccountList";
import { TranscationList } from "./modules/transcation/view/TranscationList";
import { TranscationDetail } from "./modules/transcation/view/TranscationDetail";
import { Profile } from "./modules/account/view/Profile/Profile";
import { AgentList } from "./modules/agent/view/AgentList/AgentList";
import { DepositForm } from "./modules/deposit/entry/DepositForm/DepositForm";
import { AgentDetail } from "./modules/agent/view/AgentDetail/AgentDetail";
import { PackageDetail } from "./modules/packages/view/PackageDetail/PackageDetail";
import { Register } from "./modules/account/entry/Register/Register";
import { DepositList } from "./modules/deposit/view/DepositList";
import { RepaymentList } from "./modules/repayment/view/RepaymentList";
import { RepaymentDetail } from "./modules/repayment/view/RepaymentDetail";
import { ReferralList } from "./modules/referral/view/ReferralList";

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: `${paths.register}/:referral`,
        element: <Register />
    },
    {
        path: paths.agentLogin,
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
        path: `${paths.deposit}/list`,
        element: <DepositList />
    },
    {
        path: `${paths.transaction}/deposit`,
        element: <TranscationList />
    },
    {
        path: `${paths.transaction}/:id`,
        element: <TranscationDetail />
    },
    // {
    //     path: `${ paths.agent}/:level`,
    //     element: <AgentList />
    // },
    // {
    //     path: `${ paths.agent}/:level/:id`,
    //     element: <AgentDetail />
    // },
    {
        path: paths.profile,
        element: <Profile />
    },
    {
        path: `${paths.repayment}/deposit/:deposit_id`,
        element: <RepaymentList />
    },
    {
        path: `${paths.repayment}/:id`,
        element: <RepaymentDetail />
    },
    {
        path: paths.referral,
        element: <ReferralList />
    },
    {
        path: paths.agent,
        element: <AgentList />
    }

])