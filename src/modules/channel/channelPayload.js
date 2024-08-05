export const channelPayload = {
    create: {
        name: "",
        percentage_pattern: "",
        max_agent: "",
        percentage: []
    },

    update: {
        name: "",
        percentage_pattern: "",
        max_agent: "",
        percentage: []
    },

    percentagePattern: [
        {
            pattern: "0.5%, 0.5%, 0.5%, 0.5%, 0.5%, 0.5%, 0.5%",
            max_agent: 7,
            percentage: [0.5]
        },
        {
            pattern: "0.5%, 0.5%, 0.5%, 0.5%, 1%",
            max_agent: 5,
            percentage: [0.5, 1]
        },
        {
            pattern: "0.5%, 0.5%, 1%, 1%",
            max_agent: 4,
            percentage: [0.5, 1]
        },
        {
            pattern: "1%, 1%, 1%",
            max_agent: 3,
            percentage: [1]
        },
        {
            pattern: "0.5%, 0.5%, 2%",
            max_agent: 3,
            percentage: [0.5, 2]
        },
        {
            pattern: "1%, 2%",
            max_agent: 2,
            percentage: [1, 2]
        },
        {
            pattern: "1.5%, 1.5%",
            max_agent: 2,
            percentage: [1.5]
        },
        {
            pattern: "3%",
            max_agent: 1,
            percentage: [3]
        }
    ]
}