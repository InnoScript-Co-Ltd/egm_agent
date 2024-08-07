import { useSelector } from "react-redux"
import { endpoints } from "../../constants/endpoints";
import "./header-profile.css";

export const HeaderProfile = () => {
    const { user } = useSelector(state => state.account);

    return (
        <>
            {user && user.profile === null && (
                <div className="profile-text">
                    <h1> {user.first_name.charAt(0).toUpperCase()} </h1>
                </div>
            )}

            {user && user.profile && (
                <img
                    className="profile-image"
                    src={`${endpoints.image}/${user.profile}`}
                    alt={`${user.first_name} ${user.last_name}`}
                    title={`${user.first_name} ${user.last_name}`}
                />
            )}
        </>
    )
}