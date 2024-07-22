import { useNavigate } from "react-router-dom"
import { paths } from "../constants/paths";

export const SideMenu = () => {
    const navigate = useNavigate();

    const menus = [
        {
            icon: "",
            label: "Dashboard",
            url: paths.dashboard
        },
        {
            icon: "",
            label: "Investor",
            url: paths.investor
        },
        {
            icon: "",
            label: "Packages",
            url: paths.package
        },
        {
            icon: "",
            label: "Sub Agents",
            url: ""
        },
        {
            icon: "",
            label: "Transaction",
            url: paths.transcation
        },
        {
            icon: "",
            label: "Bank Account",
            url: paths.bankAccount
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