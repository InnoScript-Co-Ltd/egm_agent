import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react"
import { ProfileImageUpload } from "../../../../shares/ProfileImageUpload/ProfileImageUpload"
import { accountPayload } from "../../accountPayload";
import { useDispatch, useSelector } from "react-redux";
import { payloadHandler } from '../../../../helpers/handler';
import { ValidationMessage } from '../../../../shares/ValidationMessage';
import { accountServices } from '../../accountServices';
import { formBuilder } from '../../../../libs/formBuilder';

export const ProfileUpdate = () => {

    const [payload, setPayload] = useState(accountPayload.update);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector(state => state.account);

    const dispatch = useDispatch();

    const updateProfileHandler = async () => {
        setLoading(true);
        const fromData = formBuilder(payload, accountPayload.update);

        const result = await accountServices.updateProfile(fromData, dispatch);

        if (result.status === 200) {
            await accountServices.profile(dispatch);
        }

        setLoading(false);
    }

    useEffect(() => {
        if (user) {
            const updateUser = { ...user };
            updateUser.profile = null;
            setPayload(updateUser);
        }
    }, [user]);

    return (
        <div className="row">
            {user && (
                <>
                    <div className="col-12 mt-3">
                        <ProfileImageUpload onSelect={(e) => {
                            payloadHandler(payload, e, "profile", (updatePayload) => {
                                setPayload(updatePayload);
                            })
                        }} />
                    </div>

                    <div className="col-12 col-md-2 col-ms-2 mt-3">
                        <Form.Group className="mt-3 w-full">
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                disabled={loading}
                                value={payload.first_name}
                                onChange={(e) => payloadHandler(payload, e.target.value, "first_name", (updatePayload) => {
                                    setPayload(updatePayload);
                                })}
                            />
                            <ValidationMessage field="first_name" />
                        </Form.Group>
                    </div>

                    <div className="col-12 col-md-2 col-ms-2 mt-3">
                        <Form.Group className="mt-3 w-full">
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                disabled={loading}
                                value={payload.last_name}
                                onChange={(e) => payloadHandler(payload, e.target.value, "last_name", (updatePayload) => {
                                    setPayload(updatePayload);
                                })}
                            />
                            <ValidationMessage field="last_name" />
                        </Form.Group>
                    </div>

                    <div className="col-12 col-md-8 col-ms-8 mt-3">
                        <Form.Group className="mt-3 w-full">
                            <Form.Control
                                type="text"
                                placeholder="Enter address"
                                disabled={loading}
                                value={payload.address ? payload.address : ""}
                                onChange={(e) => payloadHandler(payload, e.target.value, "address", (updatePayload) => {
                                    setPayload(updatePayload);
                                })}
                            />
                            <ValidationMessage field="address" />
                        </Form.Group>
                    </div>

                    <div className='d-flex flex-row align-item-center justify-content-end'>
                        <div className="col-12 col-md-2 col-ms-2 mt-3 mb-3">
                            <Form.Group className="mt-3 w-full">
                                <Button
                                    className="w-full"
                                    variant="warning"
                                    disabled={loading}
                                    onClick={() => updateProfileHandler()}
                                >
                                    Update Profile
                                </Button>
                            </Form.Group>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}