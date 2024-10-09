import { useCallback, useEffect, useState } from "react"
import { Header } from "../../../shares/Header"
import { Notification } from "../../../shares/Notification"
import { CreateReferralLink } from "../entry/CreateReferralLink"
import { useDispatch, useSelector } from "react-redux"
import { referralService } from "../referralService"
import { paths } from "../../../constants/paths"
import { useNavigate } from "react-router-dom"
import moment from "moment"

export const ReferralList = () => {

    const [loading, setLoading] = useState(false);

    const { user } = useSelector(state => state.account);
    const { referrals } = useSelector(state => state.referral);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    /** Loading Referral Data */
    const mount = useCallback(async () => {
        setLoading(true);
        await referralService.index(dispatch);
        setLoading(false);
    }, [dispatch]);

    /** Loading initialize data */
    useEffect(() => {
        mount();
    }, [mount]);

    return (
        <>
            <Header />

            <div className="container-fluid">
                {user && user.agent_type === 'MAIN_AGENT' && (
                    <div className="row">
                        <Notification />

                        <div className="col-12 mt-3">
                            <div className="row">
                                <div className="col-12 mt-3">
                                    <CreateReferralLink />
                                </div>

                                <div className="col-12 col-md-12 mt-3">
                                    <div className="card" style={{ background: "#212529", color: "#fff" }}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12 mt-3">
                                                    <h4> Your Referral Link </h4>
                                                </div>

                                                <div className="col-12 mt-3">
                                                    <div className="table-responsive">
                                                        <table className="table table-sm table-dark">
                                                            <thead>
                                                                <tr className="agent-list-table-title">
                                                                    <th scope="col"> Link </th>
                                                                    <th scope="col"> Count </th>
                                                                    <th scope="col"> Commission (%) </th>
                                                                    <th scope="col"> Expired Date </th>
                                                                </tr>
                                                            </thead>

                                                            <tbody className="agent-list-table-row">
                                                                {!loading && referrals && referrals.map((referral, index) => {
                                                                    return (
                                                                        <tr key={`referral_id_${index}`} style={{ width: "100%" }}>
                                                                            <td
                                                                                style={{
                                                                                    textDecoration: "underline #d3d3d3",
                                                                                    cursor: "pointer",
                                                                                }}
                                                                                onClick={() => navigate(`${paths.referral}/${referral.id}`)}
                                                                            >
                                                                                {referral.id}
                                                                            </td>
                                                                            <td> {referral.count} </td>
                                                                            <td> {referral.commission} </td>
                                                                            <td> {moment(referral.expired_at).format("DD/MM/YYYY")} </td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}