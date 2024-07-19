import DEFAULT_IMAGE from "../../../assets/images/default_image.png";
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
import { useDispatch } from "react-redux";
import { setRegister } from "../investorSlice";
import { formBuilder } from "../../../libs/formBuilder";
import { getData } from "../../../libs/localstorage";
import { keys } from "../../../constants/config";
import { paths } from "../../../constants/paths";

export const CreateInvestor = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(investorPayload.create);
    const [nrcFrontPreview, setNrcFrontPreview] = useState(null);
    const [nrcBackPreview, setNrcBackPreview] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerInvestor = async () => {
        setLoading(true);

        const updatePayload = { ...payload };
        updatePayload.agent_id = getData(keys.ID);

        const FormData = formBuilder(updatePayload, investorPayload.create);
        const result = await investorServices.store(FormData, dispatch);

        if (result.status === 200) {
            dispatch(setRegister(result.data));
            navigate(paths.investorVerification);
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

                        <div className="row mt-3 mb-3">
                            <div className="col-12">
                                <h3> Create New Investor Account </h3>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                                    type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                                    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of
                                    Lorem Ipsum.
                                </p>
                            </div>
                        </div>

                        <div className="row mt-3 mb-3">
                            <div className="col-12 col-md-3 col-lg-3">
                                <Form.Group className="mt-3 w-full" controlId="investor.first_name">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter First Name"
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, "first_name", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                    <ValidationMessage field="first_name" />
                                </Form.Group>
                            </div>

                            <div className="col-12 col-md-3 col-lg-3">
                                <Form.Group className="mt-3 w-full" controlId="investor.last_name">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Last Name"
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, "last_name", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                    <ValidationMessage field="last_name" />
                                </Form.Group>
                            </div>

                            <div className="col-12 col-md-3 col-lg-3">
                                <Form.Group className="mt-3 w-full" controlId="investor.dob">
                                    <Form.Control
                                        type="date"
                                        placeholder="Enter Date Of Birth"
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, "dob", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                    <ValidationMessage field="dob" />
                                </Form.Group>
                            </div>

                            <div className="col-12 col-md-3 col-lg-3">
                                <Form.Group className="mt-3 w-full" controlId="investor.email">
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Email Address"
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, "email", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                    <ValidationMessage field="email" />
                                </Form.Group>
                            </div>

                            <div className="col-12 col-md-3 col-lg-3">
                                <Form.Group className="mt-3 w-full" controlId="investor.phone">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Mobile Phone Number"
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, "phone", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                    <ValidationMessage field="phone" />
                                </Form.Group>
                            </div>

                            <div className="col-12 col-md-3 col-lg-3">
                                <Form.Group className="mt-3 w-full" controlId="investor.nrc">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter NRC Number"
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, "nrc", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                    <ValidationMessage field="nrc" />
                                </Form.Group>
                            </div>

                            <div className="col-12 col-md-6 col-lg-6">
                                <Form.Group className="mt-3 w-full" controlId="investor.address">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Address"
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, "address", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                    <ValidationMessage field="address" />
                                </Form.Group>
                            </div>

                            <div className="col-12 col-md-6 col-lg-6">
                                <Form.Group className="mt-3 w-full" controlId="investor.nrc_front">
                                    <Form.Control
                                        type="file"
                                        accept="image/png, image/gif, image/jpeg"
                                        placeholder="Enter nrc front"
                                        disabled={loading}
                                        onChange={(e) => {
                                            const objectUrl = URL.createObjectURL(e.target.files[0]);
                                            setNrcFrontPreview(objectUrl);
                                            payloadHandler(payload, e.target.files[0], "nrc_front", (updatePayload) => {
                                                setPayload(updatePayload);
                                            });
                                        }}
                                    />
                                    <ValidationMessage field="nrc_front" />
                                </Form.Group>
                            </div>

                            <div className="col-12 col-md-6 col-lg-6">
                                <Form.Group className="mt-3 w-full" controlId="investor.nrc_back">
                                    <Form.Control
                                        type="file"
                                        accept="image/png, image/gif, image/jpeg"
                                        placeholder="Enter nrc back"
                                        disabled={loading}
                                        onChange={(e) => {
                                            const objectUrl = URL.createObjectURL(e.target.files[0]);
                                            setNrcBackPreview(objectUrl);
                                            payloadHandler(payload, e.target.files[0], "nrc_back", (updatePayload) => {
                                                setPayload(updatePayload);
                                            });
                                        }}
                                    />
                                    <ValidationMessage field="nrc_back" />
                                </Form.Group>
                            </div>

                            <div className="col-12 col-md-6 col-lg-6 mt-3">
                                <div className="image-preview">
                                    {nrcFrontPreview && (
                                        <img className="default-nrc-image" src={nrcFrontPreview} alt="investor_nrc" title="investor_nrc" />
                                    )}

                                    {nrcFrontPreview === null && (
                                        <img className="default-nrc-image" src={DEFAULT_IMAGE} alt="investor_nrc" title="investor_nrc" />
                                    )}
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-6 mt-3">
                                <div className="image-preview">
                                    {nrcBackPreview && (
                                        <img className="default-nrc-image" src={nrcBackPreview} alt="investor_nrc" title="investor_nrc" />
                                    )}

                                    {nrcBackPreview === null && (
                                        <img className="default-nrc-image" src={DEFAULT_IMAGE} alt="investor_nrc" title="investor_nrc" />
                                    )}
                                </div>
                            </div>

                            <div className="col-12">
                                <Form.Group className="mt-3 w-full" controlId="login.btn">
                                    <Button
                                        className="w-full"
                                        variant="outline-warning"
                                        disabled={loading}
                                        onClick={() => registerInvestor()}
                                    >
                                        Create Investor Account
                                    </Button>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}