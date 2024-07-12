import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

export const Profile = () => {
    const { user } = useSelector(state => state.account);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (user) {
            setProfile(user);
        }
    }, [user]);

    return (

        <>
            {profile && profile.profile && (
                <div className="">

                </div>
            )}

            {profile && !profile.profile && (
                <div className="profile-image">
                    <h1> {profile.first_name.charAt(0).toUpperCase()} </h1>
                </div>
            )}
        </>
    )
}