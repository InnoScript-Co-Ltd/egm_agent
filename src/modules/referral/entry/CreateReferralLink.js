import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { useState } from "react"
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { referralService } from '../referralService';
import { useDispatch, useSelector } from 'react-redux';

export const CreateReferralLink = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({
        commission: ""
    });

    const { user } = useSelector(state => state.account);


    const dispatch = useDispatch();

    const createReferralLink = async () => {
        setLoading(true);
        await referralService.store(dispatch, payload);
        setLoading(false);
    }

    return (
        <>
            {user && user.allow_referral && (
                <div className="card" style={{ background: "#212529", color: "#fff" }}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 mt-3">
                                <h4> Create Referral Link </h4>
                            </div>

                            <div className="col-12 mt-3">
                                <p style={{ fontWeight: 300 }}>
                                    You can enter share commission percentage and click to <b> Create Link </b> button to generate referral link.
                                    Share commission percentage does not allow to exceed <code>15%</code> and min amount must be <code>5%</code>!
                                </p>

                            </div>

                            <div className="col-12 col-md-3 col-lg-3 mt-3">
                                <Form.Group className="w-full">
                                    <Form.Control
                                        type="number"
                                        min={5}
                                        max={15}
                                        placeholder="Enter Commission Amount"
                                        disabled={loading}
                                        required={true}
                                        value={payload.commission}
                                        onChange={(e) => payloadHandler(payload, e.target.value, "commission", (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                    <ValidationMessage field="commission" />
                                </Form.Group>
                            </div>

                            <div className="col-12 col-md-3 col-lg-3 mt-3">
                                <Form.Group>
                                    <Button
                                        disabled={loading}
                                        onClick={() => {
                                            createReferralLink()
                                        }}
                                    >
                                        Create Link
                                    </Button>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {user && user.allow_referral === false && (
                <div className="card" style={{ background: "#212529", color: "#fff" }}>
                    <div className="card-body">
                        <div className="row">
                            <div className='col-12 mt-3'>
                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                    Please deposit first to generate referral link.
                                    When your deposit package is expired, referral link does not work for new user.
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            )}
        </>
    )
}