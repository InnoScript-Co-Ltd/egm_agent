import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import { accountPayload } from "../../accountPayload";
import { useDispatch, useSelector } from "react-redux";
import { payloadHandler } from "../../../../helpers/handler";
import { ValidationMessage } from "../../../../shares/ValidationMessage";
import { ImageUpload } from "../../../../shares/ImageUpload";
import { accountServices } from "../../accountServices";
import { formBuilder } from "../../../../libs/formBuilder";
import moment from "moment";
import "./kycupdate.css";

export const KYCUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(accountPayload.kycUpdate);

    const { user } = useSelector(state => state.account);
    const dispatch = useDispatch();

    const updateKycHandler = async () => {
        setLoading(true);
        const formData = formBuilder(payload, accountPayload.kycUpdate);
        const result = await accountServices.updateKyc(formData, user.id, dispatch);

        if(result.status === 200) {
            await accountServices.profile(dispatch);
        }

        setLoading(false);
    }

    useEffect(() => {
        if (user) {
            const updateUser = { ...user };
            updateUser.nrc_front = null;
            updateUser.nrc_back = null;
            setPayload(updateUser);
        }
    }, [user]);

    return (
        <div className="row">
            <div className="col-12 col-md-6 col-ms-6 mt-3">
                <Form.Group className="mt-3 w-full">
                    <Form.Control
                        type="text"
                        placeholder="Enter nrc number"
                        disabled={loading}
                        value={payload.nrc}
                        onChange={(e) => payloadHandler(payload, e.target.value, "nrc", (updatePayload) => {
                            setPayload(updatePayload);
                        })}
                    />
                    <ValidationMessage field="nrc" />
                </Form.Group>
            </div>

            <div className="col-12 col-md-6 col-ms-6 mt-3">
                <Form.Group className="mt-3 w-full">
                    <Form.Control
                        type="date"
                        placeholder="Enter date of birth"
                        disabled={loading}
                        value={payload.dob ? moment(payload.dob).format("YYYY-MM-DD") : ""}
                        onChange={(e) => payloadHandler(payload, e.target.value, "dob", (updatePayload) => {
                            setPayload(updatePayload);
                        })}
                    />
                    <ValidationMessage field="dob" />
                </Form.Group>
            </div>

            <div className="col-12 col-md-6 col-ms-6 mt-3">
                <ImageUpload
                    preview={user.nrc_front ? user.nrc_front : null}
                    id={"main_agent_nrc_front"}
                    label="Uplaod NRC Front"
                    disabled={loading}
                    onSelect={(e) => payloadHandler(payload, e, "nrc_front", (updatePayload) => {
                        setPayload(updatePayload);
                    })}
                />
                <ValidationMessage field="nrc_front" />
            </div>

            <div className="col-12 col-md-6 col-sm-6 mt-3">
                <ImageUpload
                    preview={user.nrc_back ? user.nrc_back : null}
                    id={"main_agent_nrc_back"}
                    label="Uplaod NRC Back"
                    disabled={loading}
                    onSelect={(e) => payloadHandler(payload, e, "nrc_back", (updatePayload) => {
                        setPayload(updatePayload);
                    })}
                />
                <ValidationMessage field="nrc_back" />
            </div>

            <div className='d-flex flex-row align-item-center justify-content-end'>
                <div className="col-12 col-md-2 col-ms-2 mt-3 mb-3">
                    <Form.Group className="mt-3 w-full">
                        <Button
                            className="w-full"
                            variant="warning"
                            disabled={loading}
                            onClick={() => updateKycHandler()}
                        >
                            Update KYC
                        </Button>
                    </Form.Group>
                </div>
            </div>
        </div>
    )
}