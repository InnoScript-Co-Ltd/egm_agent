import LOGO from "../../../assets/images/logo.png";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { useEffect, useState } from "react";
import { authServices } from "../../authServices";
import { useDispatch, useSelector } from "react-redux";
import { payloadHandler } from "../../../helpers/handler";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/paths";
import { accountServices } from "../../account/accountServices";

export const Login = () => {
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({
        email: "",
        password: ""
    })

    const { token } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginHandler = async () => {
        setLoading(true);
        const result = await authServices.login(payload, dispatch);
        if (result.status === 200) {
            await accountServices.profile(dispatch);
            navigate(paths.dashboard);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (token) {
            navigate(paths.dashboard);
        }
    }, [token, navigate]);

    return (
        <div className="login-content d-flex flex-column align-items-center justify-content-center">
            <div className='card login-form'>
                <div className='card-body d-flex flex-column align-items-center justify-content-center'>
                    <img src={LOGO} title='Evan Global Management' alt='Evan Global Management' />
                    <div className='card-text mb-3'> Evan Global Management </div>

                    <Form.Group className="mt-3 w-full" controlId="login.email">
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

                    <Form.Group className="mt-3 w-full" controlId="login.password">
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

                    <Form.Group className="mt-3 w-full" controlId="login.btn">
                        <Button
                            className="w-full"
                            variant="outline-warning"
                            disabled={loading}
                            onClick={() => loginHandler()}
                        >
                            Login
                        </Button>
                    </Form.Group>

                    <div className="card-title mt-3 mb-3">
                        <span className="link-text" onClick={() => ""}> Forgetpassword ? </span>
                    </div>
                </div>
            </div>
        </div>
    )
}