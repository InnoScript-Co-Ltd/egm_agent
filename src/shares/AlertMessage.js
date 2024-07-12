import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

export const AlertMessage = () => {
    const { user } = useSelector(state => state.account);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (user) {
            setProfile(user);
        }
    }, [user]);

    return (
        <div className="alert-wrapper">
            {profile && profile.kyc_status === "CHECKING" && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong> KYC INFO! </strong> We are checking your account KYC and your account's kyc status is "CHECKING" state.
                </div>
            )}
        </div>
    )
}