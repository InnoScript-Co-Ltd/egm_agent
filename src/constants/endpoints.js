/** env[0] = Local | env[1] = Production */

import { baseUrl } from "./config";

export const endpoints = {
    changePassword: "auth/change-password",
    paymentPassword: "auth/payment-password",
    paymentPasswordCheck: "auth/payment-password/check",
    login: "auth/login",
    register: "account/create",
    generateLink: "account/referral",
    referral: "referral",
    resendCode: "auth/resend",
    verification: "auth/verify",
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