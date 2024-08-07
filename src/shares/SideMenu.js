import { useNavigate } from "react-router-dom"
import { paths } from "../constants/paths";
import { Speedometer, Diagram3Fill, WindowPlus, CurrencyDollar, PeopleFill, Power, PersonFill } from 'react-bootstrap-icons';
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { removeAllData } from "../libs/localstorage";


export const SideMenu = () => {
    const [sideMenuList, setSideMenuList] = useState([]);

    const { user } = useSelector(state => state.account);

    const navigate = useNavigate();

    const logoutHandler = () => {
        removeAllData();
        window.location.reload();
    }

    const loadingInit = useCallback(() => {
        if (user) {
            const menus = [
                {
                    icon: <Speedometer size={16} />,
                    label: "Dashboard",
                    url: paths.dashboard,
                    show: true
                },
                {
                    icon: <Diagram3Fill size={16} />,
                    label: "Channel",
                    url: paths.channel,
                    show: user.agent_type === "MAIN_AGENT" ? true : false
                },
                {
                    icon: <WindowPlus size={16} />,
                    label: "Investor",
                    url: paths.investor,
                    show: true
                },
                {
                    icon: <CurrencyDollar size={16} />,
                    label: "Packages",
                    url: paths.package,
                    show: true
                },
                {
                    icon: <PeopleFill size={16} />,
                    label: "Agents (Level 1)",
                    url: `${paths.agent}/level_one`,
                    show: user.agent_type === "SUB_AGENT" ? true : false
                },
                {
                    icon: <PeopleFill size={16} />,
                    label: "Agents (Level 2)",
                    url: `${paths.agent}/level_two`,
                    show: user.agent_type === "SUB_AGENT" ? true : false
                },
                {
                    icon: <PeopleFill size={16} />,
                    label: "Agents (Level 3)",
                    url: `${paths.agent}/level_three`,
                    show: user.agent_type === "SUB_AGENT" ? true : false
                },
                {
                    icon: <PeopleFill size={16} />,
                    label: "Agents (Level 4)",
                    url: `${paths.agent}/level_four`,
                    show: user.agent_type === "SUB_AGENT" ? true : false
                },
                {
                    icon: <PersonFill size={16} />,
                    label: "Profile",
                    url: paths.profile,
                    show: true
                },
                // {
                //     icon: "",
                //     label: "Transaction",
                //     url: paths.transcation,
                //     show: true
                // },
                // {
                //     icon: "",
                //     label: "Bank Account",
                //     url: paths.bankAccount,
                //     show: true
                // }
            ];

            const updateSideMenuList = menus.filter(value => value.show === true);
            setSideMenuList(updateSideMenuList);
        }
    }, [user]);

    useEffect(() => {
        loadingInit();
    }, [loadingInit])

    return (
        <div className="sidemenu-wrapper">
            <ul className="menu">
                {sideMenuList.map((value, index) => {
                    return (
                        <li className="menu-item" key={`menu_id_${index}`} onClick={() => navigate(value.url)}>
                            {value.icon}
                            <span>  {value.label}  </span>
                        </li>
                    )
                })}

                <li className="menu-item" onClick={() => logoutHandler()}> 
                    <Power size={16} />
                    <span> Logout </span>
                </li>
            </ul>
        </div>
    )
}