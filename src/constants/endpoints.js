/** env[0] = Local | env[1] = Production */

import { baseUrl } from "./config";

export const endpoints = {
    mainAgentRegister: "main/register",
    mainAgentRefrenceLink: "main/reference-link",
    subAgentRefrenceLink: "sub/reference-link",
    subAgentRegister: "sub/register",
    changePassword: "auth/change-password",
    login: "auth/login",
    register: "register",
    resendCode: "resend",
    verification: "verify",
    profile: "auth/profile",
    profileUpdate: "account",
    package: "package",
    bankAccount: "bank-account",
    invsetor: "investor",
    agentPackage: "agent-package",
    investorPackage: "investor-package",
    agentTranscation: "agent-transcation",
    investorTranscation: "investor-transcation",
    subAgent: "sub-agent",
    channel: "channel",
    image: `${baseUrl}/storage/images`,
}