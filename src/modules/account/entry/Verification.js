import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { payloadHandler } from "../../../helpers/handler";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/paths";
import { accountPayload } from "../accountPayload";
import { accountServices } from "../accountServices";

export const Verification = () => {
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(accountPayload.verification);

    const { account } = useSelector(state => state.account);
    const { token } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const registerHandler = async () => {
        setLoading(true);
        const result = await accountServices.verification(payload, dispatch);
        if(result.status === 200) {
            navigate(paths.login);
        }
        setLoading(false);
    }

    useEffect(() => {
        if(!account) {
            navigate(paths.resendCode);
        } else {
            const updatePayload = { ...payload};
            updatePayload.agent_id = account.agent_id;
            setPayload(updatePayload);
        }
    },[account, navigate]);

    useEffect(() => {
        if(token) {
            navigate(paths.dashboard);
        }
    }, [token, navigate]);
    
    return(
        <div className="login-content d-flex flex-column align-items-center justify-content-center">
            <div className='card login-form'>
            <div className="card-title">
                <div className="card-text"> 
                    Please check your email! We are already send 6 digits verification code to your email.
                </div>
            </div>

            <div className="card-sub-title">
                <div className="card-text"> Verify code will expired within 5 mins and you can get next verification code. </div>
            </div>
                <div className='card-body d-flex flex-column align-items-center justify-content-center'>
                    <Form.Group className="mt-3 w-full" controlId="verificatioin.code">
                        <Form.Control 
                            type="text"
                            placeholder="Enter your 6 digits code"
                            disabled={loading}
                            onChange={(e) => payloadHandler(payload, e.target.value, "email_verify_code", (updatePayload) => {
                                setPayload(updatePayload);
                            })}
                        />
                        <ValidationMessage field="email_verify_code" />
                    </Form.Group>

                    <Form.Group className="mt-3 w-full" controlId="login.btn">
                        <Button 
                            className="w-full" 
                            variant="outline-warning" 
                            disabled={loading}
                            onClick={() => registerHandler()}
                        > 
                            Verify Email 
                        </Button>
                    </Form.Group>
                </div>
            </div>
        </div>
    )
}