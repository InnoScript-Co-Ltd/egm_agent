import { useNavigate, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LOGO from "../../../assets/images/logo.png";
import { useState } from "react";
import { accountPayload } from "../accountPayload";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { ImageUpload } from "../../../shares/ImageUpload";
import { formBuilder } from "../../../libs/formBuilder";
import { accountServices } from "../accountServices";
import { useDispatch } from "react-redux";
import { paths } from "../../../constants/paths";
import { Notification } from "../../../shares/Notification";
import "./style/agent-register.css";

export const AgentRegister = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(accountPayload.create);
    const [verifyStep, setVerifyStep] = useState(false);
    const [resendStep, setResendStep] = useState(false);

    const [verifyPayload, setVerifyPayload] = useState(accountPayload.verification);
    const [resendPayload, setResendPayload] = useState(accountPayload.resendCode);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const mainRegisterHandler = async () => {
        setLoading(true);

        const formData = formBuilder(payload, accountPayload.create);
        const result = await accountServices.mainAgentRegister(formData, params.token, dispatch);

        if (result.status === 200) {
            payloadHandler(verifyPayload, result.data.id, "agent_id", (updatePayload) => {
                setVerifyPayload(updatePayload);
            });
            setVerifyStep(true);
            payloadHandler(verifyPayload, result.data.email, "email", (updatePayload) => {
                setResendPayload(updatePayload);
            });
        }

        setLoading(false);
    }

    const emailVerifyHandler = async () => {
        setLoading(true);
        const result = await accountServices.verification(verifyPayload, dispatch);

        if (result.status === 200) {
            navigate(paths.login);
        }

        if (result.status === 400) {
            setResendStep(true);
        }

        setLoading(false);
    }

    const resendVerifyCode = async () => {
        setLoading(true);
        const result = await accountServices.resendCode(resendPayload, dispatch);

        if(result.status === 200) {
            setResendStep(false);
        }

        setLoading(false);
    }

    return (
        <>
            <Notification />

            <div className="container-fluid">
                <div className="row main-agent-register">
                    <div className="col-12 col-md-6 col-sm-6 g-0">
                        <div className="left-side-body">
                            <div className="logo-wrapper">
                                <img className="logo" src={LOGO} alt="Evan Global Management" title="Evan Global Management" />
                                <h3> Evan Global Management </h3>
                                <p> We seek to build lasting partnerships underpinned by trust and credibility. </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-sm-6 g-0">
                        <div className="right-side-body">
                            {verifyStep === false && (
                                <div className="row">
                                    <div className="col-12">
                                        <h3> Agent Account </h3>
                                        <p> Account verification process will take 24 hours. Please patient for account opening process. </p>
                                    </div>

                                    <div className="col-12 col-md-6 col-ms-6 mt-3">
                                        <Form.Group className="mt-3 w-full">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter first name"
                                                disabled={loading}
                                                onChange={(e) => payloadHandler(payload, e.target.value, "first_name", (updatePayload) => {
                                                    setPayload(updatePayload);
                                                })}
                                            />
                                            <ValidationMessage field="first_name" />
                                        </Form.Group>
                                    </div>

                                    <div className="col-12 col-md-6 col-ms-6 mt-3">
                                        <Form.Group className="mt-3 w-full">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter last name"
                                                disabled={loading}
                                                onChange={(e) => payloadHandler(payload, e.target.value, "last_name", (updatePayload) => {
                                                    setPayload(updatePayload);
                                                })}
                                            />
                                            <ValidationMessage field="last_name" />
                                        </Form.Group>
                                    </div>

                                    <div className="col-12 col-md-6 col-ms-6 mt-3">
                                        <Form.Group className="mt-3 w-full">
                                            <Form.Control
                                                type="date"
                                                placeholder="Enter birthday"
                                                disabled={loading}
                                                onChange={(e) => payloadHandler(payload, e.target.value, "dob", (updatePayload) => {
                                                    setPayload(updatePayload);
                                                })}
                                            />
                                            <ValidationMessage field="dob" />
                                        </Form.Group>
                                    </div>

                                    <div className="col-12 col-md-6 col-ms-6 mt-3">
                                        <Form.Group className="mt-3 w-full">
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email address"
                                                disabled={loading}
                                                onChange={(e) => payloadHandler(payload, e.target.value, "email", (updatePayload) => {
                                                    setPayload(updatePayload);
                                                })}
                                            />
                                            <ValidationMessage field="email" />
                                        </Form.Group>
                                    </div>

                                    <div className="col-12 col-md-6 col-ms-6 mt-3">
                                        <Form.Group className="mt-3 w-full">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter phone number"
                                                disabled={loading}
                                                onChange={(e) => payloadHandler(payload, e.target.value, "phone", (updatePayload) => {
                                                    setPayload(updatePayload);
                                                })}
                                            />
                                            <ValidationMessage field="phone" />
                                        </Form.Group>
                                    </div>

                                    <div className="col-12 col-md-6 col-ms-6 mt-3">
                                        <Form.Group className="mt-3 w-full">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your nrc number"
                                                disabled={loading}
                                                onChange={(e) => payloadHandler(payload, e.target.value, "nrc", (updatePayload) => {
                                                    setPayload(updatePayload);
                                                })}
                                            />
                                            <ValidationMessage field="nrc" />
                                        </Form.Group>
                                    </div>

                                    <div className="col-12 col-md-6 col-ms-6 mt-3">
                                        <ImageUpload
                                            id={"main_agent_nrc_front"}
                                            label="Uplaod NRC Front"
                                            preview={null}
                                            disabled={loading}
                                            onSelect={(e) => payloadHandler(payload, e, "nrc_front", (updatePayload) => {
                                                setPayload(updatePayload);
                                            })}
                                        />
                                        <ValidationMessage field="nrc_front" />
                                    </div>

                                    <div className="col-12 col-md-6 col-ms-6 mt-3">
                                        <ImageUpload
                                            id={"main_agent_nrc_back"}
                                            label="Uplaod NRC Back"
                                            preview={null}
                                            disabled={loading}
                                            onSelect={(e) => payloadHandler(payload, e, "nrc_back", (updatePayload) => {
                                                setPayload(updatePayload);
                                            })}
                                        />
                                        <ValidationMessage field="nrc_back" />
                                    </div>

                                    <div className="col-12 col-md-12 col-ms-12 mt-3">
                                        <Form.Group className="mt-3 w-full">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter address"
                                                disabled={loading}
                                                onChange={(e) => payloadHandler(payload, e.target.value, "address", (updatePayload) => {
                                                    setPayload(updatePayload);
                                                })}
                                            />
                                            <ValidationMessage field="address" />
                                        </Form.Group>
                                    </div>

                                    <div className="col-12 col-md-6 col-ms-6 mt-3">
                                        <Form.Group className="mt-3 w-full">
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter password"
                                                disabled={loading}
                                                onChange={(e) => payloadHandler(payload, e.target.value, "password", (updatePayload) => {
                                                    setPayload(updatePayload);
                                                })}
                                            />
                                            <ValidationMessage field="password" />
                                        </Form.Group>
                                    </div>

                                    <div className="col-12 col-md-6 col-ms-6 mt-3">
                                        <Form.Group className="mt-3 w-full">
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter confirmation password"
                                                disabled={loading}
                                                onChange={(e) => payloadHandler(payload, e.target.value, "password_confirmation", (updatePayload) => {
                                                    setPayload(updatePayload);
                                                })}
                                            />
                                            <ValidationMessage field="password" />
                                        </Form.Group>
                                    </div>

                                    <div className="col-12 col-md-12 col-ms-12 mt-3 mb-3">
                                        <Form.Group className="mt-3 w-full">
                                            <Button
                                                className="w-full"
                                                variant="outline-warning"
                                                disabled={loading}
                                                onClick={() => mainRegisterHandler()}
                                            >
                                                Create Main Agent Account
                                            </Button>
                                        </Form.Group>
                                    </div>
                                </div>
                            )}

                            {verifyStep === true && (
                                <div className="row">
                                    <div className="col-12">
                                        <h3> Email Verification </h3>
                                        <p> Please check your maill box and use 6 digit OTP code email verification process.
                                            <b> FULL KYC </b> checking process will take 24 hours.
                                            Verification code will expired within 5 minutes.
                                        </p>
                                    </div>

                                    <div className="col-12 col-md-8 col-ms-8 mt-3">
                                        <Form.Group className="mt-3 w-full">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter 6 Digits Code"
                                                disabled={loading}
                                                onChange={(e) => payloadHandler(verifyPayload, e.target.value, "email_verify_code", (updatePayload) => {
                                                    setVerifyPayload(updatePayload);
                                                })}
                                            />
                                            <ValidationMessage field="email_verify_code" />
                                        </Form.Group>
                                    </div>

                                    <div className="col-12 col-md-4 col-ms-4 mt-3 mb-3">
                                        <Form.Group className="mt-3 w-full">
                                            <Button
                                                className="w-full"
                                                variant="outline-warning"
                                                disabled={loading}
                                                onClick={() => emailVerifyHandler()}
                                            >
                                                Verify Email
                                            </Button>
                                        </Form.Group>
                                    </div>

                                    {resendStep === true && (
                                        <div className="col-12 col-md-12 col-sm-12">
                                            <span className="resend-btn" onClick={() => {
                                                resendVerifyCode();
                                            }}> Resend Verification Code ? </span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}