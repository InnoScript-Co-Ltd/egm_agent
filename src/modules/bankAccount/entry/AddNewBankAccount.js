import { useState } from "react"
import { bankAccountPayload } from "../bankAccountPayload";
import Form from 'react-bootstrap/Form';
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { payloadHandler } from "../../../helpers/handler";
import Button from "react-bootstrap/esm/Button";
import { bankAccountServices } from "../bankAccountServices";
import { useDispatch } from "react-redux";

export const AddNewBankAccount = () => {
    
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(bankAccountPayload.create);

    const dispatch = useDispatch();

    const addNewAccount = async () => {
        setLoading(true);
        await bankAccountServices.store(dispatch, payload);
        setLoading(false);
    }

    return(
        <div className="card add-new-bank-account-card">
            <div className="card-title">
                <div className="card-text"> Add New Bank Account </div>
            </div>

            <div className="card-body">
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-4">
                        <Form.Group className="mt-3 w-full" controlId="register.account_name">
                            <Form.Control 
                                type="text"
                                placeholder="Enter your account holder name"
                                disabled={loading}
                                onChange={(e) => payloadHandler(payload, e.target.value, "account_name", (updatePayload) => {
                                    setPayload(updatePayload);
                                })}
                            />
                        <ValidationMessage field="account_name" />
                        </Form.Group>
                    </div>

                    <div className="col-sm-12 col-md-4 col-lg-4">
                        <Form.Group className="mt-3 w-full" controlId="register.account_number">
                            <Form.Control 
                                type="text"
                                placeholder="Enter your bank account number"
                                disabled={loading}
                                onChange={(e) => payloadHandler(payload, e.target.value, "account_number", (updatePayload) => {
                                    setPayload(updatePayload);
                                })}
                            />
                        <ValidationMessage field="account_number" />
                        </Form.Group>
                    </div>

                    <div className="col-sm-12 col-md-4 col-lg-4">
                        <Form.Group className="mt-3 w-full" controlId="register.branch">
                            <Form.Control 
                                type="text"
                                placeholder="Enter your bank branch"
                                disabled={loading}
                                onChange={(e) => payloadHandler(payload, e.target.value, "branch", (updatePayload) => {
                                    setPayload(updatePayload);
                                })}
                            />
                        <ValidationMessage field="branch" />
                        </Form.Group>
                    </div>

                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <Form.Group className="mt-3 w-full" controlId="register.address">
                            <Form.Control 
                                type="text"
                                placeholder="Enter your bank address"
                                disabled={loading}
                                onChange={(e) => payloadHandler(payload, e.target.value, "address", (updatePayload) => {
                                    setPayload(updatePayload);
                                })}
                            />
                        <ValidationMessage field="address" />
                        </Form.Group>
                    </div>

                    <div className="col-sm-12 col-md-12 col-lg-12">
                    <Form.Group className="mt-3 w-full" controlId="login.btn">
                        <Button 
                            className="w-full" 
                            variant="outline-warning" 
                            disabled={loading}
                            onClick={() => addNewAccount()}
                        > 
                            Create Bank Account
                        </Button>
                    </Form.Group>
                    </div>
                </div>
            </div>
        </div>
    )
}