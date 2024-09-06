import { useNavigate } from "react-router-dom"
import { paths } from "../constants/paths";
import { Speedometer, WindowPlus, PeopleFill, Power, PersonFill, ListNested } from 'react-bootstrap-icons';
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
                    icon: <WindowPlus size={16} />,
                    label: "Deposit",
                    url: paths.deposit,
                    show: true
                },
                {
                    icon: <ListNested size={16} />,
                    label: "Transaction",
                    url: paths.transaction,
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
                            <span></span>
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