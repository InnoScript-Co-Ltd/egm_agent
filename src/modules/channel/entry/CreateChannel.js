import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { payloadHandler } from "../../../helpers/handler";
import { useNavigate } from "react-router-dom";
import { channelServices } from "../channelServices";
import { channelPayload } from "../channelPayload";
import { paths } from '../../../constants/paths';
import { InfoCircle } from 'react-bootstrap-icons';

export const CreateChannel = () => {
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(channelPayload.create);
    const [percentagePattern, setPercentagePattern] = useState(null);

    const { user } = useSelector(state => state.account);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const createHandler = async () => {
        setLoading(true);

        const updatePayload = { ...payload };

        if (percentagePattern) {
            updatePayload.max_agent = percentagePattern.max_agent;
            updatePayload.percentage = percentagePattern.percentage;
        }

        const result = await channelServices.store(dispatch, updatePayload);

        if(result.status === 200) {
            await channelServices.index(dispatch);
        }
        
        setLoading(false);
    }

    useEffect(() => {
        if (user.agent_type !== 'MAIN_AGENT') {
            navigate(paths.dashboard);
        }
    }, [user.agent_type, navigate]);

    return (
        <>
            {user.kyc_status === 'FULL_KYC' && user.status === 'ACTIVE' && user.agent_type === 'MAIN_AGENT' && (
                <div className='card'>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="alert alert-warning">
                                    <InfoCircle size={60} />
                                    <p> Total commission ROI rate is 4%. Main agent will get 1% commission RIO and sub agent can split commission % by percentage patterns. </p>
                                </div>
                            </div>

                            <div className='col-12'>
                                <h3 className='title'> Percentage Pattern </h3>
                                <p>
                                    {channelPayload.percentagePattern.map((value, index) => {
                                        return (
                                            <code key={`pattern_id_${index}`}>{value.pattern}</code>
                                        )
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="row mt-3 mb-3">
                                    <div className="col-12 col-md-4 col-lg-4">
                                        <Form.Group className="mt-3 w-full" controlId="channel.name">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Channel Name"
                                                disabled={loading}
                                                onChange={(e) => payloadHandler(payload, e.target.value, "name", (updatePayload) => {
                                                    setPayload(updatePayload);
                                                })}
                                            />
                                            <ValidationMessage field="name" />
                                        </Form.Group>
                                    </div>

                                    <div className="col-12 col-md-4 col-lg-4">
                                        <Form.Group className="mt-3 w-full" controlId="channel.percentage_pattern">
                                            <Form.Select
                                                disabled={loading}
                                                onChange={(e) => {
                                                    const selectedValue = channelPayload.percentagePattern.filter(value => value.pattern === e.target.value)[0];
                                                    setPercentagePattern(selectedValue);
                                                    payloadHandler(payload, e.target.value, "percentage_pattern", (updatePayload) => {
                                                        setPayload(updatePayload);
                                                    })
                                                }}
                                            >
                                                <option> Choose Percentage Pattern </option>
                                                {channelPayload.percentagePattern.map((value, index) => {
                                                    return (
                                                        <option key={`percentage_pattern_id_${index}`} value={value.pattern}> {value.pattern} </option>
                                                    )
                                                })}
                                            </Form.Select>
                                            <ValidationMessage field="percentage_pattern" />
                                        </Form.Group>
                                    </div>

                                    <div className="col-12 col-md-4 col-lg-4">
                                        <Form.Group className="mt-3 w-full" controlId="channel.create.btn">
                                            <Button
                                                variant="warning"
                                                disabled={loading}
                                                onClick={() => createHandler()}
                                            >
                                                Add New Channel
                                            </Button>
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            )}
        </>
    )
}