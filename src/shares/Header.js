import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Profile } from "./Profile";
import { useNavigate } from "react-router-dom";
import { paths } from "../constants/paths";
import { getData } from "../libs/localstorage";
import { keys } from "../constants/config";
import LOGO from "../assets/images/logo.png";

export const Header = () => {
    const { user } = useSelector(state => state.account);
    const [profile, setProfile] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setProfile(user);
        }
    }, [user]);

    useEffect(() => {
        const token = getData(keys.API_TOKEN);

        if(!token) {
            navigate(paths.login);
        }
    },[navigate]);

    return (
        <>
            {profile && (
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <div className="navbar-brand">
                            <img className="header-logo" src={LOGO} alt="Evan Global Management" title="Evan Global Management" />
                            <span className="site-title"> Evan Global Management </span>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className="profile-wrapper">
                            <Profile />
                            <div className="profile-name">
                                <span> {`${profile.first_name} ${profile.last_name}`} </span>
                                <span> {profile.email}</span>
                            </div>
                        </div>
                    </div>
                </nav>
            )}
        </>
    )
}