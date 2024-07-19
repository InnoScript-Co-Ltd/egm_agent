import Button from "react-bootstrap/esm/Button"
import Form from 'react-bootstrap/Form';
import { AlertMessage } from "../../../shares/AlertMessage"
import { Header } from "../../../shares/Header"
import { SideMenu } from "../../../shares/SideMenu"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { payloadHandler } from "../../../helpers/handler"
import { ValidationMessage } from "../../../shares/ValidationMessage"
import { investorPayload } from "../investorPayload";
import { investorServices } from "../investorServices";
import { useDispatch, useSelector } from "react-redux";
import { paths } from "../../../constants/paths";
import { setRegister } from "../investorSlice";

export const EmailVerification = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(investorPayload.verifyCode);
    const [resendPayload, setResendPayload] = useState(investorPayload.verifyCode);

    const { register } = useSelector(state => state.investor);


    const navigate = useNavigate();
    const dispatch = useDispatch();


    const resendCode = async () => {
        setLoading(true);
        const result = await investorServices.resendCode(resendPayload, dispatch);

        if(result.status === 200) {
            dispatch(setRegister(result.data));
        }

        setLoading(false);
    }

    const verifySubmit = async () => {
        setLoading(true);

        if (register) {
            const updatePayload = { ...payload };
            updatePayload.investor_id = register.id;

            const result = await investorServices.verifyCode(updatePayload, dispatch);

            if(result.status === 200) {
                navigate(paths.investor);
            }
            
        }

        setLoading(false);
    }

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-2 col-lg-2">
                        <SideMenu />
                    </div>

                    <div className="col-sm-12 col-md-10 col-lg-10">
                        <div className="row mt-3 mb-3">
                            <AlertMessage />
                        </div>

                        {register && (
                            <>
                                <div className="row mt-3 mb-3">
                                    <div className="col-12">
                                        <h3> Email Verification Process  </h3>
                                        <p>
                                            Please check your email! We are already send 6 digits verification code to your email.
                                        </p>
                                    </div>
                                </div>

                                <div className="row mt-3 mb-3">
                                    <div className="col-12 col-md-3 col-lg-3">
                                        <Form.Group className="mt-3 w-full" controlId="investor.code">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter 6 Digits Code"
                                                disabled={loading}
                                                onChange={(e) => payloadHandler(payload, e.target.value, "email_verify_code", (updatePayload) => {
                                                    setPayload(updatePayload);
                                                })}
                                            />
                                            <ValidationMessage field="email_verify_code" />
                                        </Form.Group>
                                    </div>

                                    <div className="col-12 col-md-3 col-lg-3">
                                        <Form.Group className="mt-3 w-full" controlId="verify.btn">
                                            <Button
                                                variant="outline-warning"
                                                disabled={loading}
                                                onClick={() => verifySubmit()}
                                            >
                                                Verify Code
                                            </Button>
                                        </Form.Group>
                                    </div>
                                </div>
                            </>
                        )}

                        {!register && (
                            <>
                                <div className="row mt-3 mb-3">
                                    <div className="col-12">
                                        <h3> Resend Verify Code </h3>
                                        <p>
                                            6 digits verify code will send to investor email.
                                        </p>
                                    </div>
                                </div>

                                <div className="row mt-3 mb-3">
                                    <div className="col-12 col-md-3 col-lg-3">
                                        <Form.Group className="mt-3 w-full" controlId="investor.email">
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter Investor Email Address"
                                                disabled={loading}
                                                onChange={(e) => payloadHandler(resendPayload, e.target.value, "email", (updatePayload) => {
                                                    setResendPayload(updatePayload);
                                                })}
                                            />
                                            <ValidationMessage field="email" />
                                        </Form.Group>
                                    </div>

                                    <div className="col-12 col-md-3 col-lg-3">
                                        <Form.Group className="mt-3 w-full" controlId="resend.btn">
                                            <Button
                                                variant="outline-warning"
                                                disabled={loading}
                                                onClick={() => resendCode()}
                                            >
                                                Resend Verify Code
                                            </Button>
                                        </Form.Group>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}