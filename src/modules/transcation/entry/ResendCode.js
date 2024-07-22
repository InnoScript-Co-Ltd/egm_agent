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

export const ResendCode = () => {
    const { account } = useSelector(state => state.account);
    const { token } = useSelector(state => state.auth);

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(accountPayload.resendCode);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const registerHandler = async () => {
        setLoading(true);
        const result = await accountServices.resendCode(payload, dispatch);
        if(result.status === 200) {
            navigate(paths.verification)
        }
        setLoading(false);
    }

    useEffect(() => {
        if(account) {
            navigate(paths.verification);
        }
    }, [account, navigate])

    useEffect(() => {
        if(token) {
            navigate(paths.dashboard);
        }
    }, [token, navigate])
    
    return(
        <div className="login-content d-flex flex-column align-items-center justify-content-center">
            <div className='card login-form'>
            <div className="card-title">
                <div className="card-text"> 
                   Resend Verification Code
                </div>
            </div>

            <div className="card-sub-title">
                <div className="card-text"> Verify code will send to your email. </div>
            </div>
                <div className='card-body d-flex flex-column align-items-center justify-content-center'>
                    <Form.Group className="mt-3 w-full" controlId="resend.email">
                        <Form.Control 
                            type="text"
                            placeholder="Enter your email address"
                            disabled={loading}
                            onChange={(e) => payloadHandler(payload, e.target.value, "email", (updatePayload) => {
                                setPayload(updatePayload);
                            })}
                        />
                        <ValidationMessage field="email" />
                    </Form.Group>

                    <Form.Group className="mt-3 w-full" controlId="login.btn">
                        <Button 
                            className="w-full" 
                            variant="outline-warning" 
                            disabled={loading}
                            onClick={() => registerHandler()}
                        > 
                            Get Code
                        </Button>
                    </Form.Group>
                </div>
            </div>
        </div>
    )
}