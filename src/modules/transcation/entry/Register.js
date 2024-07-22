import LOGO from "../../../assets/images/logo.png";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { payloadHandler } from "../../../helpers/handler";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/paths";
import { accountPayload } from "../accountPayload";
import { accountServices } from "../accountServices";

export const Register = () => {
    const { token } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(accountPayload.create);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const registerHandler = async () => {
        setLoading(true);
        const result = await accountServices.register(payload, dispatch);
        if(result.status === 200) {
            navigate(paths.verification)
        }
        setLoading(false);
    }
    
    useEffect(() => {
        if(token) {
            navigate(paths.dashboard);
        }
    },[token, navigate])
    
    
    return(
        <div className="login-content d-flex flex-column align-items-center justify-content-center">
            <div className='card login-form'>
                <div className='card-body d-flex flex-column align-items-center justify-content-center'>
                    <img src={LOGO} title='Evan Global Management' alt='Evan Global Management' />
                    <div className='card-text mb-3'> Evan Global Management Co., Ltd </div>

                    <Form.Group className="mt-3 w-full" controlId="register.first_name">
                        <Form.Control 
                            type="text"
                            placeholder="Enter your first name"
                            disabled={loading}
                            onChange={(e) => payloadHandler(payload, e.target.value, "first_name", (updatePayload) => {
                                setPayload(updatePayload);
                            })}
                        />
                        <ValidationMessage field="first_name" />
                    </Form.Group>

                    <Form.Group className="mt-3 w-full" controlId="register.last_name">
                        <Form.Control 
                            type="text"
                            placeholder="Enter your last name"
                            disabled={loading}
                            onChange={(e) => payloadHandler(payload, e.target.value, "last_name", (updatePayload) => {
                                setPayload(updatePayload);
                            })}
                        />
                        <ValidationMessage field="last_name" />
                    </Form.Group>

                    <Form.Group className="mt-3 w-full" controlId="register.email">
                        <Form.Control 
                            type="email"
                            placeholder="Enter your email address"
                            disabled={loading}
                            onChange={(e) => payloadHandler(payload, e.target.value, "email", (updatePayload) => {
                                setPayload(updatePayload);
                            })}
                        />
                        <ValidationMessage field="email" />
                    </Form.Group>

                    <Form.Group className="mt-3 w-full" controlId="register.phone">
                        <Form.Control 
                            type="text"
                            placeholder="Enter your phone number"
                            disabled={loading}
                            onChange={(e) => payloadHandler(payload, e.target.value, "phone", (updatePayload) => {
                                setPayload(updatePayload);
                            })}
                        />
                        <ValidationMessage field="phone" />
                    </Form.Group>

                    <Form.Group className="mt-3 w-full" controlId="register.password">
                        <Form.Control 
                            type="password"
                            placeholder="Enter your password"
                            disabled={loading}
                            onChange={(e) => payloadHandler(payload, e.target.value, "password", (updatePayload) => {
                                setPayload(updatePayload);
                            })}
                        />
                        <ValidationMessage field="password" />
                    </Form.Group>

                    <Form.Group className="mt-3 w-full" controlId="register.password_confirmation">
                        <Form.Control 
                            type="password"
                            placeholder="Enter your confirmation password"
                            disabled={loading}
                            onChange={(e) => payloadHandler(payload, e.target.value, "password_confirmation", (updatePayload) => {
                                setPayload(updatePayload);
                            })}
                        />
                        <ValidationMessage name="password_confirmation" />
                    </Form.Group>

                    <Form.Group className="mt-3 w-full" controlId="login.btn">
                        <Button 
                            className="w-full" 
                            variant="outline-warning" 
                            disabled={loading}
                            onClick={() => registerHandler()}
                        > 
                            Create Agent Account 
                        </Button>
                    </Form.Group>

                    <div className="card-title mt-3 mb-3"> 
                        <span className="link-text" onClick={() => navigate(paths.login)}> Login? </span> 
                    </div>
                </div>
            </div>
        </div>
    )
}