
import Alert from 'react-bootstrap/Alert';
import { accountServices } from '../../accountServices';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { paths } from '../../../../constants/paths';
import { baseUrl } from '../../../../constants/config';
import { Copy } from 'react-bootstrap-icons';
import "./refrencelink.css";

export const RefrenceLink = () => {

    const [refrenceLink, setRefrenceLink] = useState(null);

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.account);

    const generateRefrenceLink = async () => {
        if (user.agent_type === "MAIN_AGENT") {
            const result = await accountServices.mainAgentGenerateLink(dispatch);

            if (result.status === 200) {
                const generateRefrence = `${baseUrl}${paths.subAgentRegister}/${result.data}`;
                setRefrenceLink(generateRefrence);
            }
        }

        if (user.agent_type === "SUB_AGENT") {
            const result = await accountServices.subAgentGenerateLink(dispatch);

            if (result.status === 200) {
                const generateRefrence = `${baseUrl}${paths.subAgentRegister}/${result.data}`;
                setRefrenceLink(generateRefrence);
            }
        }
    }

    const copyRefrenceLink = () => {
        const copyText = document.getElementById("refrenceLink").innerHTML;
        navigator.clipboard.writeText(copyText);
    }

    return (
        <div className="row">
            <div className="col-12 mt-3">
                <h4> Generate Refrence Link </h4>
                <p> 
                    Refrence link will expired within 6 months and you can generate refrence link anytime. 
                    {user.kyc_status !== 'FULL_KYC' && (
                        <span> Refrence link can not generate because your account's KYC is not verified. Please wait 24 hour for kyc status activiation. </span>
                    )}
                </p>
            </div>

            <div className="col-12 mt-3">
                <span className="refrence-link-btn" onClick={() => generateRefrenceLink()}> # Click here to generate refrence link </span>
            </div>

            {refrenceLink && (
                <div className="col-12 mt-3">
                    <Alert variant="dark">
                        <div className='alert-text'>
                            <div className='refrencelink-url' id="refrenceLink">
                                {refrenceLink}
                            </div>

                            <Copy size={28} className='copy-text' onClick={() => copyRefrenceLink()} />
                        </div>
                    </Alert>
                </div>
            )}
        </div>
    )
}