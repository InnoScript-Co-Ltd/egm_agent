import { useCallback, useEffect, useRef, useState } from "react"
import { Header } from "../../../../shares/Header"
import { Notification } from "../../../../shares/Notification"
import { SideMenu } from "../../../../shares/SideMenu"
import { useDispatch, useSelector } from "react-redux"
import { agentServices } from "../../agentServices"
import { useParams } from "react-router-dom";
import { Status } from "../../../../shares/Status/Status"
import { CurrencyDollar, PeopleFill } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import numeral from "numeral"
import { paths } from "../../../../constants/paths"
import "./agent-list.css";

export const AgentList = () => {
    const [loading, setLoading] = useState(false);
    const [levelAgents, setLevelAgents] = useState([]);

    const { user } = useSelector(state => state.account);
    const { agents } = useSelector(state => state.agent);

    const dispatch = useDispatch();
    const params = useParams();
    const navigator = useNavigate();

    const level = useRef();
    const count = useRef({
        agent: 0,
        deposit_amount: 0,
        roi_amount: 0,
        commission_amount: 0
    });

    const initLoading = useCallback(async () => {
        setLoading(true);

        if (params.level === 'level_one') {
            level.current = "Level One Agents";
        }

        if (params.level === 'level_two') {
            level.current = "Level Two Agents";
        }

        if (params.level === 'level_three') {
            level.current = "Level Three Agents";
        }

        if (params.level === 'level_four') {
            level.current = "Level Four Agents";
        }

        const result = await agentServices.levelAgentIndex(dispatch, params.level);
        count.current = {
            agent: 0,
            deposit_amount: 0,
            roi_amount: 0,
            commission_amount: 0
        }

        if (result.status === 200 && result.data) {
            const deposits = [];

            await result.data.map((agent) => {
                deposits.push(...agent.deposit);
                return agent;
            });

            const updateCount = { ...count.current };

            deposits.map((value) => {
                updateCount.deposit_amount += value.deposit_amount;
                updateCount.roi_amount += value.roi_amount;
                updateCount.commission_amount += value.commission_amount;
                return value;
            });

            updateCount.agent = result.data.length;
            count.current = updateCount;
        }

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

                    {user && user.kyc_status === 'FULL_KYC' && user.status === 'ACTIVE' && (
                        <div className="col-sm-12 col-md-10 col-lg-10 mt-3">
                            <div className="row">
                                <div className="col-12 col-md-3 mt-3">
                                    <div className="card card-warning">
                                        <div className="card-body">
                                            <div className="count-wrapper">
                                                <PeopleFill size={50} style={{ fontWeight: "bolder" }} />
                                                <span> {numeral(count.current.agent).format("0,0")} </span>
                                            </div>
                                            <span className="count-label"> {level.current} </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-3 mt-3">
                                    <div className="card card-primary">
                                        <div className="card-body">
                                            <div className="count-wrapper">
                                                <CurrencyDollar size={50} style={{ fontWeight: "bolder" }} />
                                                <span> {numeral(count.current.deposit_amount).format("0,0")} </span>
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
                                                <span> {numeral(count.current.roi_amount).format("0,0")} </span>
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
                                                <span> {numeral(count.current.commission_amount).format("0,0")} </span>
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

                            {!loading && levelAgents.length > 0 && (
                                <div className="table-responsive">
                                    <table className="table table-sm table-dark">
                                        <thead>
                                            <tr className="agent-list-table-title">
                                                <th scope="col"> # </th>
                                                <th scope="col"> Name </th>
                                                <th scope="col"> NRC </th>
                                                <th scope="col"> Phone </th>
                                                <th scope="col"> Email </th>
                                                <th scope="col"> Address </th>
                                                <th scope="col"> KYC </th>
                                                <th scope="col"> Status </th>
                                            </tr>
                                        </thead>

                                        <tbody className="agent-list-table-row">
                                            {levelAgents.map((value, index) => {
                                                return (
                                                    <tr key={`level_agent_id_${index}`} style={{ width: "100%" }}>
                                                        <td> {index + 1} </td>
                                                        <td>
                                                            <span
                                                                style={{ cursor: "pointer", textDecoration: "underline" }}
                                                                onClick={() => navigator(`${paths.agent}/${params.level}/${value.id}`)}
                                                            >
                                                                {`${value.first_name} ${value.last_name}`}
                                                            </span>
                                                        </td>
                                                        <td> {value.nrc} </td>
                                                        <td> {value.phone} </td>
                                                        <td> {value.email} </td>
                                                        <td> {value.address} </td>
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
                    )}
                </div>
            </div>
        </>
    )
}