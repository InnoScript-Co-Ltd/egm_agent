import { useDispatch, useSelector } from "react-redux"
import Button from "react-bootstrap/esm/Button";
import { AlertMessage } from "../../../shares/AlertMessage"
import { Header } from "../../../shares/Header"
import { useCallback, useEffect, useState } from "react";
import { transcationServices } from "../transcationServices";
import { Status } from "../../../shares/Status/Status";
import { Check2Circle, InfoCircle, StopCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/paths";
import numeral from "numeral";
import moment from "moment";

export const TranscationList = () => {
    const { user } = useSelector(state => state.account);
    const { transactions } = useSelector(state => state.transaction);

    const [transcationStatus, setTranscationStatus] = useState("DEPOSIT_PENDING");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadingTranscation = useCallback(async () => {
        setLoading(true);
        await transcationServices.index(dispatch, transcationStatus);
        setLoading(false)
    }, [dispatch, transcationStatus]);

    useEffect(() => {
        loadingTranscation();
    }, [loadingTranscation]);

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="row mt-3 mb-3">
                            <AlertMessage />
                        </div>

                        {user && user.kyc_status === 'FULL_KYC' && user.status === 'ACTIVE' && (
                            <div className="row">
                                {transcationStatus === "DEPOSIT_PENDING" && (
                                    <div className="col-12">
                                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                            We are checking your deposit transaction and deposit amount will transfer to investment trade account within 24 hours.
                                        </div>
                                    </div>
                                )}

                                <div className="col-12">
                                    <div className="w-full d-flex flex-row align-items-center justify-content-start">
                                        <Button
                                            variant="warning"
                                            disabled={loading}
                                            onClick={() => setTranscationStatus("DEPOSIT_PENDING")}
                                        >
                                            <InfoCircle size={16} /> PENDING
                                        </Button>

                                        <Button
                                            style={{ marginLeft: "10px" }}
                                            variant="danger"
                                            disabled={loading}
                                            onClick={() => setTranscationStatus("DEPOSIT_REJECT")}
                                        >
                                            <StopCircle size={16} /> REJECT
                                        </Button>

                                        <Button
                                            style={{ marginLeft: "10px" }}
                                            variant="success"
                                            disabled={loading}
                                            onClick={() => setTranscationStatus("DEPOSIT_PAYMENT_ACCEPTED")}
                                        >
                                            <Check2Circle size={16} /> PAYMENT ACCEPTED
                                        </Button>
                                    </div>
                                </div>

                                <div className="col-12 mt-3">
                                    <div className="table-responsive">
                                        <table className="table table-sm table-dark">
                                            <thead>
                                                <tr className="agent-list-table-title">
                                                    <th scope="col"> # </th>
                                                    <th scope="col"> ID</th>
                                                    <th scope="col"> Deposit <small> (Kyats)</small> </th>
                                                    <th scope="col"> Duration <small> (Kyats) </small> </th>
                                                    <th scope="col"> Created At </th>
                                                    <th scope="col"> Updated At </th>
                                                    <th scope="col"> Status </th>
                                                </tr>
                                            </thead>

                                            <tbody className="agent-list-table-row">
                                                {transactions && transactions.map((value, index) => {
                                                    return (
                                                        <tr key={`level_agent_id_${index}`} style={{ width: "100%" }}>
                                                            <td> {index + 1} </td>
                                                            <td
                                                                style={{
                                                                    textDecoration: "underline #d3d3d3",
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => navigate(`${paths.transaction}/${value.id}`)}
                                                            >
                                                                {value.id}
                                                            </td>
                                                            <td> {numeral(value.package_deposit_amount).format('0,0')} </td>
                                                            <td> {value.package_duration} Months </td>
                                                            <td> {moment(value.created_at).format("DD/MM/YYYY hh:mm:ss A")} </td>
                                                            <td> {moment(value.updated_at).format("DD/MM/YYYY hh:mm:ss A")} </td>
                                                            <td> <Status status={value.status} /> </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
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