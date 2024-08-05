import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import DEFAULT_IMAGE from "../../../assets/images/default_image.png";
import { useSelector } from "react-redux";
import moment from "moment";

export const InvestorProfile = () => {
    const [loading, setLoading] = useState(false);

    const { investor } = useSelector(state => state.investor);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (investor) {
            setProfile(investor);
        }
    }, [investor]);

    return (
        <>
            {profile && (
                <div className="row">
                    <div className="col-12">
                        <div className="card investor-profile-card">
                            <div className="card-body">
                                <div className="investor-profile-wrapper">
                                    {!profile.profile && (
                                        <img className="investor-profile-picture" src={DEFAULT_IMAGE} alt={`${profile.first_name} ${profile.last_name}`} />
                                    )}

                                    {profile.profile && (
                                        <img className="investor-profile-picture" src={profile.profile} alt={`${profile.first_name} ${profile.last_name}`} />
                                    )}

                                    <div className="invetor-profile-info">
                                        <span>
                                            {`${profile.first_name} ${profile.last_name}`}
                                            <span className={`badge ${profile.kyc_status === 'NONE' ? 'bg-danger' : 'bg-success'}`}
                                            >
                                                KYC - {profile.kyc_status}
                                            </span>
                                            <span className={
                                                `badge ${profile.status === 'CHECKING' ? 'bg-warning' : profile.status === 'PENDING' ? 'bg-danger' : 'bg-success'}`
                                            }>
                                                STATUS - {profile.status}
                                            </span>
                                        </span>
                                        <span> {`${profile.email}`} </span>
                                        <span> {`${profile.phone}`} </span>
                                        <span> Join Date - {moment(profile.created_at).format('DD-MM-YYYY')} </span>

                                        <div className="btn-group">
                                            <Button
                                                size="small"
                                                variant="warning"
                                                disabled={loading}
                                            >
                                                View Detail
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="invetor-roi">
                                        <p> Package not found. ROI information is not available </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}