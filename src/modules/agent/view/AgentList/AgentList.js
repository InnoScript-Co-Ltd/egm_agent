import { useCallback, useEffect, useState } from "react"
import { Header } from "../../../../shares/Header"
import { Notification } from "../../../../shares/Notification"
import { SideMenu } from "../../../../shares/SideMenu"
import { useDispatch, useSelector } from "react-redux"
import { agentServices } from "../../agentServices"
import { useParams } from "react-router-dom";
import moment from "moment"
import numeral from "numeral"
import "./agent-list.css";
import { Status } from "../../../../shares/Status/Status"
import { CurrencyDollar, PeopleFill } from "react-bootstrap-icons"

export const AgentList = () => {
    const [loading, setLoading] = useState(false);
    const [levelAgents, setLevelAgents] = useState([]);

    const { user } = useSelector(state => state.account);
    const { agents } = useSelector(state => state.agent);

    const dispatch = useDispatch();
    const params = useParams();

    const initLoading = useCallback(async () => {
        setLoading(true);
        await agentServices.levelAgentIndex(dispatch, params.level);
        setLoading(false);

    }, [dispatch, params.level]);

    useEffect(() => {
        initLoading();
    }, [initLoading]);

    useEffect(() => {
        if (agents) {
            setLevelAgents(agents);
        }
    }, [agents]);

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
                        <div className="row">
                            <div className="col-12 col-md-3 mt-3">
                                <div className="card card-warning">
                                    <div className="card-body">
                                        <div className="count-wrapper">
                                            <PeopleFill size={50} style={{ fontWeight: "bolder" }} />
                                            <span> {numeral(1000).format("0,0")} </span>
                                        </div>
                                        <span className="count-label"> Level One Agents </span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-3 mt-3">
                                <div className="card card-primary">
                                    <div className="card-body">
                                        <div className="count-wrapper">
                                            <CurrencyDollar size={50} style={{ fontWeight: "bolder" }} />
                                            <span> {numeral(55500000).format("0,0")} </span>
                                        </div>
                                        <span className="count-label"> Total Deposit </span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-3 mt-3">
                                <div className="card card-danger">
                                    <div className="card-body">
                                        <div className="count-wrapper">
                                            <CurrencyDollar size={50} style={{ fontWeight: "bolder" }} />
                                            <span> {numeral(5550000000 * 10 / 100).format("0,0")} </span>
                                        </div>
                                        <span className="count-label"> Monthy ROI (10%) </span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-3 mt-3">
                                <div className="card card-success">
                                    <div className="card-body">
                                        <div className="count-wrapper">
                                            <CurrencyDollar size={50} style={{ fontWeight: "bolder" }} />
                                            <span> {numeral(400000).format("0,0")} </span>
                                        </div>
                                        <span className="count-label"> Monthly Commission (1%) </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="agent-table-col-short-description mb-3 mt-3">
                            <span className="badge badge-light badge-color"> DA = Deposit Amount </span>
                            <span className="badge badge-light badge-color"> Dt = Duration </span>
                            <span className="badge badge-light badge-color"> ROI = Retrun On Investment </span>
                            <span className="badge badge-light badge-color"> RpT = Total Repayment </span>
                            <span className="badge badge-light badge-color"> RRp = Remaining Repayment </span>
                            <span className="badge badge-light badge-color"> CmP = Comission Percentage </span>
                            <span className="badge badge-light badge-color"> CmA = Comission Amount </span>
                        </div>

                        {levelAgents.length > 0 && (
                            <div className="table-responsive">
                                <table className="table table-sm table-dark">
                                    <thead>
                                        <tr className="agent-list-table-title">
                                            <th scope="col"> # </th>
                                            <th scope="col"> Name </th>
                                            <th scope="col"> DA <small> (Kyats) </small> </th>
                                            <th scope="col"> Dt <small> (Kyats) </small> </th>
                                            <th scope="col"> ROI <small> (Kyats) </small> </th>
                                            <th scope="col"> RpT </th>
                                            <th scope="col"> RRp </th>
                                            <th scope="col"> CmP (%) </th>
                                            <th scope="col"> CmA <small> (Kyats) </small> </th>
                                            <th scope="col"> KYC </th>
                                            <th scope="col"> Status </th>
                                        </tr>
                                    </thead>

                                    <tbody className="agent-list-table-row">
                                        {levelAgents.map((value, index) => {
                                            return (
                                                <tr key={`level_agent_id_${index}`} style={{width: "100%"}}>
                                                    <td> {index + 1} </td>
                                                    <td>
                                                        <span> {`${value.first_name} ${value.last_name}`} </span>
                                                    </td>
                                                    <td> {numeral(10000000).format("0,0")} </td>
                                                    <td> 6 Months </td>
                                                    <td> {numeral(10000000 * 10 / 100).format("0,0")} / Month </td>
                                                    <td> 6 Times </td>
                                                    <td> 4 Times </td>
                                                    <td> 1 % </td>
                                                    <td> {numeral(10000000 * 1 / 100).format("0,0")} / Month </td>
                                                    <td> <Status status={value.kyc_status} /> </td>
                                                    <td> <Status status={value.status} /> </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}