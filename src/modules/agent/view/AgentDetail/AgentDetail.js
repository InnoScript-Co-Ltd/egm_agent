import { useCallback, useEffect, useRef, useState } from "react"
import { Header } from "../../../../shares/Header"
import { Notification } from "../../../../shares/Notification"
import { SideMenu } from "../../../../shares/SideMenu"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { endpoints } from "../../../../constants/endpoints"
import { agentServices } from "../../agentServices"
import { Status } from "../../../../shares/Status/Status"
import { WalletFill } from "react-bootstrap-icons"
import { AmountFormat } from "../../../../shares/AmountFormat/AmountFormat"
import Button from "react-bootstrap/esm/Button"
import { paths } from "../../../../constants/paths"
import numeral from "numeral";
import moment from "moment"

export const AgentDetail = () => {
    const [loading, setLoading] = useState(false);
    const [deposits, setDeposit] = useState([]);

    const { agent } = useSelector(state => state.agent);

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const count = useRef({
        deposit_amount: 0,
        commission_amount: 0,
        roi_amount: 0
    });

    const initLoading = useCallback(async () => {
        setLoading(true);

        count.current = {
            deposit_amount: 0,
            commission_amount: 0,
            roi_amount: 0
        }

        const result = await agentServices.show(dispatch, params.id);

        if (result.status === 200) {
            setDeposit(result.data.deposit);
            const updateCount = { ...count.current };

            result.data.deposit.map((value) => {
                updateCount.deposit_amount += value.deposit_amount;
                updateCount.commission_amount += value.commission_amount;
                updateCount.roi_amount += value.roi_amount;
                return value;
            });

            count.current = updateCount;
        }

        setLoading(false);
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
                                        <div className="col-12 col-md-6 col-lg-6">
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

                                        <div className="col-12 col-md-6 col-lg-6">
                                            <div className="row">
                                                <div className="col-12 col-md-6 mt-3">
                                                    <div className="card card-primary">
                                                        <div className="card-body">
                                                            <div className="count-wrapper">
                                                                <WalletFill size={50} style={{ fontWeight: "bolder" }} />
                                                                {!loading && count.current && (
                                                                    <AmountFormat datasource={count.current.deposit_amount ? count.current.deposit_amount : 0} />
                                                                )}
                                                            </div>
                                                            <span className="count-label"> Your Deposit (Kyats) </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 mt-3">
                                                    <div className="card card-success">
                                                        <div className="card-body">
                                                            <div className="count-wrapper">
                                                                <WalletFill size={50} style={{ fontWeight: "bolder" }} />
                                                                {!loading && count.current.roi_amount && (
                                                                    <AmountFormat datasource={count.current.roi_amount ? count.current.roi_amount : 0} />
                                                                )}
                                                            </div>
                                                            <span className="count-label"> ROI Amount (Kyats) </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 mt-3">
                                                    <div className="card card-danger">
                                                        <div className="card-body">
                                                            <div className="count-wrapper">
                                                                <WalletFill size={50} style={{ fontWeight: "bolder" }} />
                                                                {!loading && count.current.commission_amount && (
                                                                    <AmountFormat datasource={count.current.commission_amount ? count.current.commission_amount : 0} />
                                                                )}
                                                            </div>
                                                            <span className="count-label"> Commission Amount (Kyats) </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-12 col-lg-12 mt-3">
                                            <div className="table-responsive">
                                                <table className="table table-sm table-dark">
                                                    <thead>
                                                        <tr className="agent-list-table-title">
                                                            <th scope="col"> # </th>
                                                            <th scope="col"> Deposit Amount <small> (kyats) </small> </th>
                                                            <th scope="col"> ROI Amount <small> (kyats) </small> </th>
                                                            <th scope="col"> Commission Amount <small> (kyats) </small> </th>
                                                            <th scope="col"> Expired At </th>
                                                            <th scope="col"> Created At </th>
                                                            <th scope="col"> Option </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {deposits && deposits.length > 0 && deposits.map((value, index) => {
                                                            return (
                                                                <tr key={`deposit_id_${index}`} className="tr">
                                                                    <td> {index + 1} </td>
                                                                    <td> {numeral(value.deposit_amount).format('0,0')} </td>
                                                                    <td> {numeral(value.roi_amount).format('0,0')} </td>
                                                                    <td> {numeral(value.commission_amount).format('0,0')} </td>
                                                                    <td> {moment(value.expired_at).format('DD/MM/YYYYY hh:mm:ss')} </td>
                                                                    <td> {moment(value.created_at).format('DD/MM/YYYYY hh:mm:ss')} </td>
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
                                                </table>
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