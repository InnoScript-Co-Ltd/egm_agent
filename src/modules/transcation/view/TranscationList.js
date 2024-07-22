import { useDispatch, useSelector } from "react-redux"
import Button from "react-bootstrap/esm/Button";
import { AlertMessage } from "../../../shares/AlertMessage"
import { Header } from "../../../shares/Header"
import { SideMenu } from "../../../shares/SideMenu"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useCallback, useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { transcationServices } from "../transcationServices";
import { paths } from "../../../constants/paths";
import { useNavigate } from "react-router-dom";
import numeral from "numeral";

export const TranscationList = () => {
    const { user } = useSelector(state => state.account);
    const { agent_transcation, investor_transcation } = useSelector(state => state.transcation);


    const [loading, setLoading] = useState(false);
    const [selectTab, setSelectTab] = useState("agent_request");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadingTranscation = useCallback(async () => {
        setLoading(true);

        if (selectTab === 'agent_request') {
            await transcationServices.agent(dispatch);
        }

        if (selectTab === 'investor_request') {
            await transcationServices.investor(dispatch);
        }

        setLoading(false)
    }, [dispatch, selectTab]);

    useEffect(() => {
        loadingTranscation();
    }, [loadingTranscation]);

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-2 col-lg-2">
                        <SideMenu />
                    </div>

                    <div className="col-sm-12 col-md-10 col-lg-10">
                        <div className="row mt-3 mb-3">
                            <AlertMessage />
                        </div>

                        {user && user.kyc_status === 'FULL_KYC' && (
                            <>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <div className="d-flex flex-row justify-content-between align-item-center">

                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-3 mb-3">
                                    <div className="col-12">
                                        <div className="card">

                                            <div className="card-body">
                                                <Tabs
                                                    onSelect={(e) => {
                                                        setSelectTab(e);
                                                    }}
                                                    defaultActiveKey={selectTab}
                                                    id="transcation"
                                                    className="mb-3"
                                                >
                                                    <Tab eventKey="agent_request" title="Agent">
                                                        <span className="note-description">  Agent Deposit ROI (10%) + Agent Commission ROI (4%) = Total ROI (14%) </span>
                                                        <div className="table-responsive">
                                                            <Table striped bordered hover className="mt-3">
                                                                <tbody>
                                                                    {agent_transcation && agent_transcation.map((value, index) => {
                                                                        return (
                                                                            <tr key={`agent_request_id_${index}`} className="tr">
                                                                                <td> {value.package_name} </td>
                                                                                <td> {Number(value.package_roi_rate) + 4} % </td>
                                                                                <td> {value.package_duration} Year </td>
                                                                                <td> ${numeral(value.package_deposit_rate).format(0, 0)} </td>
                                                                                <td> {value.status} </td>
                                                                                <td>
                                                                                    <Button
                                                                                        className="btn-small"
                                                                                        size="small"
                                                                                        variant="warning"
                                                                                        disabled={loading}
                                                                                        onClick={() => navigate(`${paths.investor}/${value.id}`)}
                                                                                    >
                                                                                        Detail
                                                                                    </Button>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })}
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </Tab>

                                                    <Tab eventKey="investor_request" title="Investor">
                                                    <span className="note-description">Agent Commission ROI = 4% / Month </span>
                                                        <div className="table-responsive">
                                                            <Table striped bordered hover className="mt-3">
                                                                <tbody>
                                                                    {investor_transcation && investor_transcation.map((value, index) => {
                                                                        return (
                                                                            <tr key={`agent_request_id_${index}`} className="tr">
                                                                                <td> {value.package_name} </td>
                                                                                <td> {value.investor.first_name} {value.investor.last_name}</td>
                                                                                <td> ROI - {Number(value.package_roi_rate)} % / Month </td>
                                                                                <td> Duration - {value.package_duration} Year </td>
                                                                                <td> Deposit - ${numeral(value.package_deposit_rate).format(0, 0)} </td>
                                                                                <td> {value.status} </td>
                                                                                <td>
                                                                                    <Button
                                                                                        className="btn-small"
                                                                                        size="small"
                                                                                        variant="warning"
                                                                                        disabled={loading}
                                                                                        onClick={() => navigate(`${paths.investor}/${value.id}`)}
                                                                                    >
                                                                                        Detail
                                                                                    </Button>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })}
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </Tab>

                                                </Tabs>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}