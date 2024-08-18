import { useCallback, useEffect, useState } from "react"
import { Header } from "../../../../shares/Header"
import { Notification } from "../../../../shares/Notification"
import { SideMenu } from "../../../../shares/SideMenu"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { endpoints } from "../../../../constants/endpoints"
import { agentServices } from "../../agentServices"
import moment from "moment"
import { Status } from "../../../../shares/Status/Status"

export const AgentDetail = () => {
    const [loading, setLoading] = useState(false);
    const { agent } = useSelector(state => state.agent);

    const dispatch = useDispatch();
    const params = useParams();

    const initLoading = useCallback(async () => {
        await agentServices.show(dispatch, params.id);
    }, [dispatch, params.id]);

    useEffect(() => {
        initLoading();
    }, [initLoading]);

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-2 col-lg-2">
                        <SideMenu />
                    </div>

                    <Notification />

                    <div className="col-sm-12 col-md-10 col-lg-10 mt-3">
                        {!loading && agent && (
                            <div className="card" style={{ background: "#212529", color: "#fff" }}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 col-md-4 col-lg-4">
                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                <small> Username </small>
                                                <small> {agent.username} </small>
                                            </div>

                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                <small> Full Name </small>
                                                <small> {agent.first_name} {agent.last_name} </small>
                                            </div>

                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                <small> Email </small>
                                                <small> {agent.email} </small>
                                            </div>

                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                <small> Phone </small>
                                                <small> {agent.phone} </small>
                                            </div>

                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                <small> NRC </small>
                                                <small> {agent.nrc} </small>
                                            </div>

                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                <small> Birthday </small>
                                                <small> {moment(agent.dob).format('DD/MM/YYYY')} </small>
                                            </div>

                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                <small> Address </small>
                                                <small> {agent.address} </small>
                                            </div>

                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                <small> Status </small>
                                                <Status status={agent.status} />
                                            </div>

                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                <small> KYC Status </small>
                                                <Status status={agent.kyc_status} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}