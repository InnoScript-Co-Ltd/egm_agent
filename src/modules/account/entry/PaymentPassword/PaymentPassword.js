import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { payloadHandler } from '../../../../helpers/handler';
import { useState } from 'react';
import { accountPayload } from '../../accountPayload';
import { useDispatch, useSelector } from 'react-redux';
import { ValidationMessage } from '../../../../shares/ValidationMessage';
import { accountServices } from '../../accountServices';
import "./payment-password.css";

export const PaymentPassword = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(accountPayload.paymentPasswordUpdate);

    const { user } = useSelector(state => state.account);
    const dispatch = useDispatch();

    const paymentPasswordHandler = async () => {
        setLoading(true);
        const updatePayload = {...payload};
        updatePayload.agent_id = user.id;
        const result = await accountServices.updatePaymentPassword(updatePayload, dispatch);

        if(result.status === 200) {
            await accountServices.profile(dispatch);
        }

        setLoading(false);
    }

    return(
        <div className="row mt-3">
            <div className="col-12 mt-3">
                <h4> Set Payment Password </h4>
            </div>

            <div className="col-12 col-md-3 col-lg-3">
                <Form.Group className="mt-3 w-full">
                    <Form.Control
                        type="password"
                        placeholder="Enter payment password"
                        disabled={loading}
                        onChange={(e) => payloadHandler(payload, e.target.value, "payment_password", (updatePayload) => {
                            setPayload(updatePayload);
                        })}
                    />
                    <ValidationMessage field="payment_password" />
                </Form.Group>
            </div>

            <div className="col-12 col-md-2 col-lg-2">
                <Form.Group className="mt-3 w-full">
                    <Button
                        className="w-full"
                        variant="warning"
                        disabled={loading}
                        onClick={() => paymentPasswordHandler()}
                    >
                        Update
                    </Button>
                </Form.Group>
            </div>
        </div>
    )
}