import { useNavigate } from "react-router-dom"

export const SideMenu = () => {
    const navigate = useNavigate();

    const menus = [
        {
            icon: "",
            label: "Dashboard",
            url: ""
        },
        {
            icon: "",
            label: "Investor",
            url: ""
        },
        {
            icon: "",
            label: "Packages",
            url: ""
        },
        {
            icon: "",
            label: "Sub Agents",
            url: ""
        },
        {
            icon: "",
            label: "Transaction",
            url: ""
        },
        {
            icon: "",
            label: "Bank Account",
            url: ""
        },
        {
            icon: "",
            label: "Account",
            url: ""
        },
        {
            icon: "",
            label: "Security",
            url: ""
        },
        {
            icon: "",
            label: "Logout",
            url: ""
        }
    ]
    return (
        <div className="sidemenu-wrapper">
            <ul className="menu">
                {menus.map((value, index) => {
                    return (
                        <li className="menu-item" key={`menu_id_${index}`} onClick={() => navigate(value.url)}>
                            <i className="bi bi-alarm"></i>
                            {value.label} 
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}