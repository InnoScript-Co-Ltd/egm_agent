import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { paths } from "../constants/paths";
import { getData, removeAllData } from "../libs/localstorage";
import { keys } from "../constants/config";
import { Speedometer, PeopleFill, PersonFill, Power, CurrencyExchange, Receipt, ShareFill } from 'react-bootstrap-icons';
import { logout } from "../modules/auth/authSlice";
import LOGO from "../assets/images/logo.png";

export const Header = () => {
    const [sideMenuList, setSideMenuList] = useState([]);
    const { user } = useSelector(state => state.account);

    const dispatch = useDispatch();

    const logoutHandler = () => {
        removeAllData();
        dispatch(logout);
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
                    icon: <CurrencyExchange size={16} />,
                    label: "Deposit",
                    url: null,
                    show: true,
                    children: [
                        {
                            label: "Your Deposit",
                            url: `${paths.deposit}/list`,
                            show: true,
                        },
                        {
                            label: "Request",
                            url: `${paths.deposit}`,
                            show: true,
                        }
                    ]
                },
                {
                    icon: <Receipt size={16} />,
                    label: "Transactions",
                    url: null,
                    show: true,
                    children: [
                        {
                            icon: <Receipt size={16} />,
                            label: "Deposit",
                            url: `${paths.transaction}/deposit`,
                            show: true,
                        }
                    ]
                },
                {
                    icon: <PeopleFill size={16} />,
                    label: "Agents",
                    url: `${paths.agent}`,
                    show: true
                },
                {
                    icon: <ShareFill size={16} />,
                    label: "Referral",
                    url: `${paths.referral}`,
                    show: user.agent_type === "MAIN_AGENT" ? true : false
                },
                {
                    icon: <PersonFill size={16} />,
                    label: "Profile",
                    url: paths.profile,
                    show: true
                }
            ];

            const updateSideMenuList = menus.filter(value => value.show === true);
            setSideMenuList(updateSideMenuList);
        }
    }, [user]);

    useEffect(() => {
        loadingInit();
    }, [loadingInit])

    const navigate = useNavigate();

    useEffect(() => {
        const token = getData(keys.API_TOKEN);

        if (!token) {
            navigate(paths.login);
        }
    }, [navigate]);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            {user && (
                <div className="container-fluid">
                    <div className="navbar-brand" onClick={() => navigate(paths.dashboard)}>
                        <img
                            className="header-logo"
                            src={LOGO}
                            alt="Evan Global Management"
                            title="Evan Global Management"
                        />
                    </div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="pi pi-bars"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {sideMenuList.map((value, index) => {
                                if (value.url === null) {
                                    return (
                                        <li key={`menu_id_${index}`} className="nav-item dropdown">
                                            <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <span> {value.icon}</span>
                                                <span> {value.label}</span>
                                            </span>
                                            <ul className="dropdown-menu">
                                                {value.children.map((child, childIndex) => {
                                                    return (
                                                        <li
                                                            className="dropdown-item"
                                                            key={`child_menu_id_${childIndex}`}
                                                            onClick={() => navigate(child.url)}
                                                        >
                                                            <span>  {child.label}  </span>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </li>
                                    )
                                }

                                return (
                                    <li className="nav-item" key={`menu_id_${index}`} onClick={() => navigate(value.url)}>
                                        <span> {value.icon} </span>
                                        <span>  {value.label}  </span>
                                    </li>
                                )
                            })}

                            <li className="nav-item" onClick={() => logoutHandler()}>
                                <Power size={16} />
                                <span> Logout </span>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    )
}