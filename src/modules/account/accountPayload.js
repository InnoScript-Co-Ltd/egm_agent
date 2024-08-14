export const accountPayload = {
    create: {
        first_name: "",
        last_name: "",
        dob: "",
        phone: "",
        email: "",
        nrc: "",
        nrc_front: "",
        nrc_back: "",
        address: "",
        password: "",
        password_confirmation: ""
    },

    update: {
        profile: "",
        first_name: "",
        last_name: "",
        dob: "",
        phone: "",
        address: "",
    },

    kycUpdate: {
        nrc_front: "",
        nrc_back: "",
        nrc: "",
        dob: "",
    },

    resendCode: {
        email: ""
    },

    verification: {
        agent_id: "",
        email_verify_code: ""
    },

    changePassword: {
        agent_id: "",
        old_password: "",
        password: "",
        password_confirmation: ""
    },

    accountUpdate: {
        email: "",
        phone: ""
    },

    paymentPasswordUpdate: {
        agent_id: "",
        payment_password: ""
    },

    createBankAccount: {
        account_name: "",
        account_number: "",
        bank_type: "",
        bank_type_label: "",
        branch: "",
        branch_address: ""
    },

    updateBankAccount: {
        account_name: "",
        account_number: "",
        bank_type: "",
        bank_type_label: "",
        branch: "",
        branch_address: "",
        status: ""
    },

    confirmPaymentPassword: {
        payment_password: ""
    }
}