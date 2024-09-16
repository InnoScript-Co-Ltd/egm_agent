
import Alert from 'react-bootstrap/Alert';
import { accountServices } from '../../accountServices';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import { paths } from '../../../../constants/paths';
import { appUrl } from '../../../../constants/config';
import { Copy } from 'react-bootstrap-icons';
import moment from "moment";
import "./referral.css";

export const ReferralLink = () => {

    const [referral, setReferral] = useState(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { user, referrals } = useSelector(state => state.account);

    const generateReferralLink = async () => {
        setLoading(true);
        const result = await accountServices.generateReferralLink(dispatch);
        const generateReferral = `${appUrl}${paths.register}/${result.data.link}`;
        setReferral(generateReferral);
        setLoading(false);
    }

    const copyReferralLink = () => {
        const copyText = document.getElementById("referral-link").innerHTML;
        navigator.clipboard.writeText(copyText);
    }

    const initializeLoading = useCallback(async () => {
        setLoading(true);
        await accountServices.referrals(dispatch);
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        initializeLoading();
    }, [initializeLoading])

    return (
        <div className="row">
            <div className="col-12 mt-3">
                <h4 style={{ color: "#ffff" }}> Generate Referral Link </h4>
                <ul>
                    <li> Referral link will expired within 1 month and you can generate another refrerral link anytime. </li>
                    <li> Agent need to be subscribe deposit plan to generate referral link. </li>
                    <li> When deposit plan is expired, referral link will not generate. </li>
                    {user.kyc_status !== 'FULL_KYC' && (
                        <li> Referral link can not generate because your account's KYC is not verified. Please wait 24 hour for kyc status activiation. </li>
                    )}
                </ul>
                <p>
                </p>
            </div>

            {user.kyc_status === 'FULL_KYC' && (
                <div className="col-12 mt-3">
                    <span className="refrence-link-btn" onClick={() => generateReferralLink()}> # Click here to generate refrence link </span>
                </div>
            )}

            {referral && (
                <div className="col-12 mt-3">
                    <Alert variant="dark">
                        <div className='alert-text'>
                            <div className='refrencelink-url' id="referral-link">
                                {referral}
                            </div>

                            <Copy size={28} className='copy-text' onClick={() => copyReferralLink()} />
                        </div>
                    </Alert>
                </div>
            )}

            {loading === false && referrals && (
                <div className="table-responsive mt-3">
                    <table className="table table-sm table-dark">
                        <thead>
                            <tr className="agent-list-table-title">
                                <th scope="col"> # </th>
                                <th scope="col"> Link </th>
                                <th scope="col"> Count </th>
                                <th scope="col"> Expired Date </th>
                            </tr>
                        </thead>

                        <tbody className="agent-list-table-row">
                            {loading === false && referrals && referrals.map((value, index) => {
                                return (
                                    <tr key={`referral_id_${index}`}>
                                        <td style={{ width: "50px" }}> {index + 1} </td>
                                        <td style={{ width: "300px" }}> {`agent.evanglobalmanagement.com/agent/register/${value.link}`} </td>
                                        <th style={{ width: "300px" }}> {value.count} </th>
                                        <td style={{ width: "300px" }}> {moment(value.expired_at).format('DD/MM/YYYY')} </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}