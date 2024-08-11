import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { payloadHandler } from '../../helpers/handler';
import { ValidationMessage } from '../ValidationMessage';
import { accountPayload } from '../../modules/account/accountPayload';
import { accountServices } from '../../modules/account/accountServices';
import { useDispatch } from 'react-redux';
import "./delete-modal.css";

export const DeleteModal = ({ title, body, show, onClose, delAction }) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(accountPayload.confirmPaymentPassword);
    
    const dispatch = useDispatch();

    const delHandler = async () => {
        setLoading(true);
        const result = await accountServices.checkPaymemntPassword(payload, dispatch);

        if(result.status === 200) {
            delAction(true);
            setOpen(false);
        }

        setLoading(false);
    };

    const closeHandler = () => {
        setOpen(false);
        onClose(false);
    }

    useEffect(() => {
        if (show) {
            setOpen(show);
        }
    }, [show]);

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={open} onHide={() => closeHandler()}>
                <Modal.Header closeButton>
                    <Modal.Title> <span className='black-color'> {title} </span> </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className='black-color'> {body} Please enter your payment password. </p>
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
                    <Button variant="primary" onClick={() => delHandler()}> Confirm </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}