import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { accountPayload } from "../../accountPayload";
import { useDispatch } from "react-redux";
import { payloadHandler } from '../../../../helpers/handler';
import { ValidationMessage } from '../../../../shares/ValidationMessage';
import { accountServices } from '../../accountServices';
import { bankTypes } from '../../../../constants/config';
import "./create-bank-account.css";

export const CreateBankAccount = () => {
    const [loading, setLoading] = useState();
    const [payload, setPayload] = useState(accountPayload.createBankAccount);

    const dispatch = useDispatch();

    const banckAccountCreateHandler = async () => {
        setLoading(true);
        const result = await accountServices.createBankAccount(payload, dispatch);
        
        if(result.status === 200) {
            await accountServices.bankAccountIndex(dispatch);
        }
        setLoading(false);
    }

    return(
        <div className="row">
        <div className="col-12 col-md-3 col-ms-3 mt-3">
            <Form.Group className="mt-3 w-full">
                <Form.Control
                    type="text"
                    placeholder="Enter account name"
                    disabled={loading}
                    onChange={(e) => payloadHandler(payload, e.target.value, "account_name", (updatePayload) => {
                        setPayload(updatePayload);
                    })}
                />
                <ValidationMessage field="account_name" />
            </Form.Group>
        </div>

        <div className="col-12 col-md-3 col-ms-3 mt-3">
            <Form.Group className="mt-3 w-full">
                <Form.Control
                    type="text"
                    placeholder="Enter bank account number"
                    disabled={loading}
                    onChange={(e) => payloadHandler(payload, e.target.value, "account_number", (updatePayload) => {
                        setPayload(updatePayload);
                    })}
                />
                <ValidationMessage field="account_number" />
            </Form.Group>
        </div>

        <div className="col-12 col-md-3 col-ms-3 mt-3">
            <Form.Group className="mt-3 w-full">
                <Form.Select
                    disabled={loading}
                    onChange={(e) => payloadHandler(payload, e.target.value, "bank_type", (updatePayload) => {
                        setPayload(updatePayload);
                    })}
                >
                    { bankTypes.map((bank, index) => {
                        return(
                            <option key={`bank_type_id_${index}`} value={bank.name}> {bank.name} </option>
                        )
                    })}
                </Form.Select>
                <ValidationMessage field="bank_type" />
            </Form.Group>
        </div>

        <div className="col-12 col-md-3 col-ms-3 mt-3">
            <Form.Group className="mt-3 w-full">
                <Form.Control
                    type="text"
                    placeholder="Enter bank branch"
                    disabled={loading}
                    onChange={(e) => payloadHandler(payload, e.target.value, "branch", (updatePayload) => {
                        setPayload(updatePayload);
                    })}
                />
                <ValidationMessage field="branch" />
            </Form.Group>
        </div>

        <div className="col-12 col-md-12 col-ms-12 mt-3">
            <Form.Group className="mt-3 w-full">
                <Form.Control
                    type="text"
                    placeholder="Enter bank branch address"
                    disabled={loading}
                    onChange={(e) => payloadHandler(payload, e.target.value, "branch_address", (updatePayload) => {
                        setPayload(updatePayload);
                    })}
                />
                <ValidationMessage field="branch_address" />
            </Form.Group>
        </div>

        <div className='d-flex flex-row align-item-center justify-content-end'>
            <div className="col-12 col-md-2 col-ms-2 mt-3 mb-3">
                <Form.Group className="mt-3 w-full">
                    <Button
                        className="w-full"
                        variant="warning"
                        disabled={loading}
                        onClick={() => banckAccountCreateHandler()}
                    >
                        Create Bank Account
                    </Button>
                </Form.Group>
            </div>
        </div>
    </div>
    )
}