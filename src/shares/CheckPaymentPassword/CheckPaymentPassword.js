import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { ValidationMessage } from '../ValidationMessage';
import { payloadHandler } from '../../helpers/handler';
import { accountServices } from "../../modules/account/accountServices";

export const CheckPaymentPassword = ({ show, onClose, callbackfn }) => {
    
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({
        payment_password: ""
    });

    const dispatch = useDispatch();

    const closeHandler = () => {
        setOpen(false);
        onClose(false);
    }

    const onSubmitHandler = async () => {
        setLoading(true);
        const result = await accountServices.checkPaymemntPassword(payload, dispatch);

        if(result.status === 200) {
            callbackfn();
        }

        if(result.status === 200 || result.status === 400) {
            setOpen(false);
            onClose(false);
        }

        setPayload({ payment_password: ""});
        setLoading(false);
    }

    useEffect(() => {
        if (show) {
            setOpen(show);
        }
    }, [show]);

    return(
        <Modal show={open} onHide={() => closeHandler()}>
            <Modal.Header closeButton>
                <Modal.Title> <span className='black-color'> Payment Password Confirmation </span> </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p className='black-color'> Please enter your payment password. </p>
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
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={() => onSubmitHandler()}> Confirm </Button>
            </Modal.Footer>
        </Modal>
    )
}