/** env[0] = Local | env[1] = Production */

import { baseUrl } from "./config";

export const endpoints = {
    mainAgentRegister: "main/register",
    mainAgentRefrenceLink: "main/reference-link",
    subAgentRefrenceLink: "sub/reference-link",
    subAgentRegister: "sub/register",
    changePassword: "auth/change-password",
    paymentPassword: "auth/payment-password",
    login: "auth/login",
    checkPaymentPassword: "auth/payment-password",
    register: "register",
    resendCode: "resend",
    verification: "verify",
    profile: "auth/profile",
    profileUpdate: "account",
    package: "package",
    bankAccount: "agent-bank-account",
    merchantBankAccount: "merchant-bank-account",
    levelAgent: "level",
    image: `${baseUrl}/storage/images`,
    deposit: "deposit",
    transaction: "transaction",
    dashboard: "dashboard",
    agent: "profile"
}