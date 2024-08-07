import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import "./account-update.css";
import { payloadHandler } from "../../../../helpers/handler";
import { accountPayload } from "../../accountPayload";
import { ValidationMessage } from "../../../../shares/ValidationMessage";
import { accountServices } from "../../accountServices";

export const AccountUpdate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(accountPayload.accountUpdate)

    const {user} = useSelector(state => state.account);
    const dispatch = useDispatch();

    const updateAccountHandler = async () => {
        setLoading(true);
        const result = await accountServices.updateAccount(payload, user.id, dispatch);

        if(result.status === 200) {
            await accountServices.profile(dispatch);
        }
        
        setLoading(false);
    }

    useEffect(() => {
        if(user) {
            setPayload(user);
        }
    },[user]);

    return(
        <div className="row mb-3">
            <div className="col-12 col-md-5 col-lg-5">
                <Form.Group className="mt-3 w-full">
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        disabled={loading}
                        value={payload.email}
                        onChange={(e) => payloadHandler(payload, e.target.value, "email", (updatePayload) => {
                            setPayload(updatePayload);
                        })}
                    />
                    <ValidationMessage field="email" />
                </Form.Group>
            </div>

            <div className="col-12 col-md-5 col-lg-5">
                <Form.Group className="mt-3 w-full">
                    <Form.Control
                        type="text"
                        placeholder="Enter phone"
                        disabled={loading}
                        value={payload.phone}
                        onChange={(e) => payloadHandler(payload, e.target.value, "phone", (updatePayload) => {
                            setPayload(updatePayload);
                        })}
                    />
                    <ValidationMessage field="phone" />
                </Form.Group>
            </div>

            <div className="col-12 col-md-2 col-lg-2">
                <Form.Group className="mt-3 w-full">
                    <Button
                        className="w-full"
                        variant="warning"
                        disabled={loading}
                        onClick={() => updateAccountHandler()}
                    >
                       Update
                    </Button>
                </Form.Group>
            </div>
        </div>
    )
}