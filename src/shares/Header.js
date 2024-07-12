import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Profile } from "./Profile";

export const Header = () => {
    const { user } = useSelector(state => state.account);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (user) {
            setProfile(user);
        }
    }, [user]);
    return (
        <>
            {profile && (
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <div className="navbar-brand"> Agent Dashboard </div>
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