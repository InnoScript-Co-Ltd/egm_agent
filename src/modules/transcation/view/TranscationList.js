import { useDispatch, useSelector } from "react-redux"
import Button from "react-bootstrap/esm/Button";
import { AlertMessage } from "../../../shares/AlertMessage"
import { Header } from "../../../shares/Header"
import { SideMenu } from "../../../shares/SideMenu"
import { useCallback, useEffect, useState } from "react";
import { transcationServices } from "../transcationServices";
import { Status } from "../../../shares/Status/Status";
import { Check2Circle, InfoCircle, StopCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/paths";
import numeral from "numeral";

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
                    <div className="col-sm-12 col-md-2 col-lg-2">
                        <SideMenu />
                    </div>

                    <div className="col-sm-12 col-md-10 col-lg-10">
                        <div className="row mt-3 mb-3">
                            <AlertMessage />
                        </div>

                        {user && user.kyc_status === 'FULL_KYC' && user.status === 'ACTIVE' && (
                            <>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="w-full d-flex flex-row align-items-center justify-content-start">
                                            <Button
                                                variant="warning"
                                                disabled={loading}
                                                onClick={() => setTranscationStatus("DEPOSIT_PENDING")}
                                            >
                                                <InfoCircle size={16} /> TRANSCATIONS PENDING
                                            </Button>

                                            <Button
                                                style={{ marginLeft: "10px" }}
                                                variant="danger"
                                                disabled={loading}
                                                onClick={() => setTranscationStatus("DEPOSIT_REJECT")}
                                            >
                                                <StopCircle size={16} /> TRANSCATIONS REJECT
                                            </Button>

                                            <Button
                                                style={{ marginLeft: "10px" }}
                                                variant="success"
                                                disabled={loading}
                                                onClick={() => setTranscationStatus("DEPOSIT_PAYMENT_ACCEPTED")}
                                            >
                                                <Check2Circle size={16} /> TRANSCATIONS PAYMENT ACCEPTED
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <div className="table-responsive">
                                            <table className="table table-sm table-dark">
                                                <thead>
                                                    <tr className="agent-list-table-title">
                                                        <th scope="col"> # </th>
                                                        <th scope="col"> Transaction ID</th>
                                                        <th scope="col"> Deposit Amount <small> (Kyats)</small> </th>
                                                        <th scope="col"> Package Name </th>
                                                        <th scope="col"> Duration <small> (Kyats) </small> </th>
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
                                                                > {value.id} </td>
                                                                <td> {numeral(value.package_deposit_amount).format('0,0')} </td>
                                                                <td> {value.package_name} </td>
                                                                <td> {value.package_duration} Months </td>
                                                                <td> <Status status={value.status} /> </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
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