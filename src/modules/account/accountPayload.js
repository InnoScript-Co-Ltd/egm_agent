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
        agent_id: "",
        profile: "",
        first_name: "",
        last_name: "",
        dob: "",
        phone: "",
        address: "",
    },

    kycUpdate: {
        agent_id: "",
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
    }
}