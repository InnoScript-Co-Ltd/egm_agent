
import Alert from 'react-bootstrap/Alert';
import { accountServices } from '../../accountServices';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { paths } from '../../../../constants/paths';
import { appUrl } from '../../../../constants/config';
import { Copy } from 'react-bootstrap-icons';
import "./referral.css";

export const ReferralLink = () => {

    const [referral, setReferral]= useState(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.account);

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
        </div>
    )
}