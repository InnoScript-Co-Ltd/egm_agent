import { useDispatch, useSelector } from "react-redux";
import { Header } from "../../../shares/Header";
import { Notification } from "../../../shares/Notification";
import { useCallback, useEffect, useState } from "react";
import { depositServices } from "../depositServices";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/paths";
import Badge from 'react-bootstrap/Badge';
import numeral from "numeral";
import moment from "moment";

export const DepositList = () => {

    const [loading, setLoading] = useState(false);

    const { deposits } = useSelector(state => state.deposit);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initLoading = useCallback(async () => {
        setLoading(true);
        await depositServices.index(dispatch);
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        initLoading();
    }, [initLoading]);

    return (
        <>
            <Header />

            <div className="container-fluid">
                <div className="row">
                    <Notification />

                    <div className="col-12 mt-3">
                        <div className="row">
                            <div className="col-12 col-md-12 mt-3">
                                <div className="card" style={{ background: "#212529", color: "#fff" }}>
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="col-12 mt-3">
                                                <h4> Your Deposit </h4>
                                            </div>

                                            <div className="col-12 mt-3">
                                                <div className="table-responsive">
                                                    <table className="table table-sm table-dark">
                                                        <thead>
                                                            <tr className="agent-list-table-title">
                                                                <th scope="col"> # </th>
                                                                <th scope="col"> ID</th>
                                                                <th scope="col"> Deposit <small> (Kyats)</small> </th>
                                                                <th scope="col"> ROI <small> (Kyats) </small> </th>
                                                                <th scope="col"> Deposit Date </th>
                                                                <th scope="col"> Expired Date </th>
                                                                <th scope="col"> Status </th>
                                                            </tr>
                                                        </thead>

                                                        <tbody className="agent-list-table-row">
                                                            {!loading && deposits && deposits.map((deposit, index) => {
                                                                return (
                                                                    <tr key={`deposit_id_${index}`} style={{ width: "100%" }}>
                                                                        <td> {index + 1} </td>
                                                                        <td
                                                                            style={{
                                                                                textDecoration: "underline #d3d3d3",
                                                                                cursor: "pointer",
                                                                            }}
                                                                            onClick={() => navigate(`${paths.repayment}/deposit/${deposit.id}`)}
                                                                        >
                                                                            {deposit.id}
                                                                        </td>
                                                                        <td> {numeral(deposit.deposit_amount).format('0,0')} </td>
                                                                        <td> {numeral(deposit.roi_amount).format('0,0')} </td>
                                                                        <td> {moment(deposit.created_at).format("DD/MM/YYYY hh:mm:ss A")} </td>
                                                                        <td> {moment(deposit.expired_at).format("DD/MM/YYYY")} </td>
                                                                        <td> {moment(deposit.expired_at).isBefore(moment()) ? 
                                                                                <Badge bg="danger"> EXPIRED </Badge> : 
                                                                                <Badge bg="success"> ACTIVE </Badge>} </td>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}