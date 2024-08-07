import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { useState } from 'react';
import { payloadHandler } from '../../../../helpers/handler';
import { accountPayload } from '../../accountPayload';
import { ValidationMessage } from '../../../../shares/ValidationMessage';
import { accountServices } from '../../accountServices';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllData } from '../../../../libs/localstorage';
import "./style.css";

export const ChangePassword = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(accountPayload.changePassword);

    const { user } = useSelector(state => state.account);

    const dispatch = useDispatch();

    const changePasswordHandler = async () => {
        setLoading(true);
        const updatePayload = {...payload};
        updatePayload.agent_id = user.id;

        const result = await accountServices.changePassword(updatePayload, dispatch);

        if (result.status === 200) {
            removeAllData();
            window.location.reload();
        }

        setLoading(false);
    }

    return (
        <div className="row mb-3">
            <div className="col-12 mt-3">
                <h4> Change Password </h4>
            </div>

            <div className="col-12 col-md-3 col-lg-3">
                <Form.Group className="mt-3 w-full">
                    <Form.Control
                        type="password"
                        placeholder="Enter old password"
                        disabled={loading}
                        onChange={(e) => payloadHandler(payload, e.target.value, "old_password", (updatePayload) => {
                            setPayload(updatePayload);
                        })}
                    />
                    <ValidationMessage field="old_password" />
                </Form.Group>
            </div>

            <div className="col-12 col-md-3 col-lg-3">
                <Form.Group className="mt-3 w-full">
                    <Form.Control
                        type="password"
                        placeholder="Enter new password"
                        disabled={loading}
                        onChange={(e) => payloadHandler(payload, e.target.value, "password", (updatePayload) => {
                            setPayload(updatePayload);
                        })}
                    />
                    <ValidationMessage field="new_password" />
                </Form.Group>
            </div>

            <div className="col-12 col-md-3 col-lg-3">
                <Form.Group className="mt-3 w-full">
                    <Form.Control
                        type="password"
                        placeholder="Enter confirm password"
                        disabled={loading}
                        onChange={(e) => payloadHandler(payload, e.target.value, "password_confirmation", (updatePayload) => {
                            setPayload(updatePayload);
                        })}
                    />
                    <ValidationMessage field="password_confirmation" />
                </Form.Group>
            </div>

            <div className="col-12 col-md-3 col-lg-3">
                <Form.Group className="mt-3 w-full">
                    <Button
                        className="w-full"
                        variant="warning"
                        disabled={loading}
                        onClick={() => changePasswordHandler()}
                    >
                        Change Password
                    </Button>
                </Form.Group>
            </div>
        </div>
    )
}