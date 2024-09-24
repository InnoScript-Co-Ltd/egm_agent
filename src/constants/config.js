import { getData } from "../libs/localstorage";

export const env = 0;

export const baseUrl = [
    'http://localhost:8000',
    'https://api.evanglobalmanagement.com',
][env];

export const appUrl = [
    'http://localhost:3000',
    'https://agent.evanglobalmanagement.com'
][env];

export const keys = {
    API_TOKEN: "TOKEN",
    ID: "ID",
    USER: "USER",
    PERMISSION: "PERMISSION",
    ROLE: "ROLE",
    LANGUAGE: "LANGUAGE"
}

export const ReferralLinkType = {
    LEVEL_FOUR_REFERRAL: "LEVEL_FOUR_REFERRAL",
    CLIENT_REFERRAL: "CLIENT_REFERRAL",
    COMMISSION_REFERRAL: "COMMISSION_REFERRAL"
}

export const AgentType = {
    MAIN_AGENT: "MAIN_AGENT",
    SUB_AGENT: "SUB_AGENT"
}

export const notificationOptions = {
    severity: "info",
    sticky: false,
    life: 2000,
    closable: true,
    icon: "pi pi-info-circle",
}

export const bankTypes = [
    {
        name: "AYA BANK",
        value: "aya_bank",
        icon: ""
    },
    {
        name: "CB BANK",
        value: "cb_bank",
        icon: ""
    },
    {
        name: "UAB BANK",
        value: "uab_bank",
        icon: ""
    },
    {
        name: "KBZ BANK SPECIAL ACC",
        value: "kbz_bank_special",
        icon: ""
    },
    {
        name: "A BANK",
        value: "a_bank",
        icon: ""
    },
    {
        name: "MCB BANK",
        value: "mcb_bank",
        icon: ""
    },

    {
        name: "YOMA (Flexi every day)",
        value: "yoma_bank_flexi",
        icon: ""
    },
    {
        name: "YOMA (Flexi saving)",
        value: "yoma_bank_flexi_saving",
        icon: ""
    },

]
export const statusOptions = [
    { status: "ACTIVE", color: "badge-success" },
    { status: "DEPOSIT_PAYMENT_ACCEPTED", color: "badge-success" },
    { status: "DISABLE", color: "badge-danger" },
    { status: "DEPOSIT_REJECT", color: "badge-danger" },
    { status: "DELETED", color: "badge-dark" },
    { status: "PENDING", color: "badge-warning" },
    { status: "DEPOSIT_PENDING", color: "badge-warning" },
    { status: "BLOCK", color: "badge-danger" },
    { status: "COMPLETE", color: "badge-success" },
    { status: "FULL_KYC", color: "badge-success" },
    { status: "CHECKING", color: "badge-warning" },
];

export const tooltipOptions = { 
   position: 'top'
}

export const auditColumns = [
    { field: "created_by", header: "Created By" },
    { field: "updated_by", header: "Updated By" },
    { field: "created_at", header: "Created At" },
    { field: "updated_at", header: "Updated At" },
    { field: "deleted_at", header: "Deleted At" },
];

export const responsiveOptions = [
    {
        breakpoint: '991px',
        numVisible: 4
    },
    {
        breakpoint: '767px',
        numVisible: 3
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
];

export const itemTemplate = (item) => {
    return <img src={item?.itemImageSrc} alt={'GSC Export'} style={{ width: '100%', minHeight: '368px', display: 'block' }} />;
}

export const thumbnailTemplate = (item) => {
    return <img width={100} height={80} src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
}

/**
 * Language / Region / Country
 */
export const countries = [
    { name: 'China', code: 'CN' },
    { name: 'Myanmar', code: 'MM' },
    { name: 'English', code: 'UK' }
];
export const defaultLanguage = getData(keys.LANGUAGE) ? getData(keys.LANGUAGE) : countries[1];

export const renderHeader = () => {
    return (
        <span className="ql-formats">
            <select className="ql-font">
                <option value="serif"></option>
                <option value="sans-serif"></option>
                <option value="monospace"></option>
            </select>
            <select className="ql-size">
                <option value="small"></option>
                <option value="large"></option>
                <option value="huge"></option>
            </select>
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
            <button className="ql-align" aria-label="Align"></button>
            <button className="ql-color" aria-label="Color"></button>
            <button className="ql-background" aria-label="Background"></button>
            <button className="ql-list" aria-label="Ordered"></button>
            <button className="ql-script" value="sub"></button>
            <button className="ql-script" value="super"></button>
            <button className="ql-code" aria-label="Code"></button>
            <button className="ql-link" aria-label="Link"></button>
            <button className="ql-clean" aria-label="Clean"></button>
        </span>
    );
};