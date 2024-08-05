import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import LOGO from "../../../assets/images/logo.png";
import { useState } from "react";
import { accountPayload } from "../accountPayload";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { ImageUpload } from "../../../shares/ImageUpload";
import Button from 'react-bootstrap/Button';
import { formBuilder } from "../../../libs/formBuilder";
import { accountServices } from "../accountServices";
import { useDispatch } from "react-redux";
import "./style/main-agent-register.css";

export const MainAgentRegister = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(accountPayload.create);

    const dispatch = useDispatch();
    const params = useParams();

    const mainRegisterHandler = async () => {
        setLoading(true);

        const formData = formBuilder(payload, accountPayload.create);
        const result = await accountServices.mainAgentRegister(formData, params.token, dispatch);

        if (result.status === 200) {
        }
        setLoading(false);
    }

    return (
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
                        <div className="row">
                            <div className="col-12">
                                <h3> Main Agent Account </h3>
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
                    </div>
                </div>
            </div>
        </div>
    )
}