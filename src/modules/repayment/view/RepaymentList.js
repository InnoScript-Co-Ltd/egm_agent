import { useDispatch, useSelector } from "react-redux";
import { Header } from "../../../shares/Header";
import { CalendarFill } from "react-bootstrap-icons";
import { Notification } from "../../../shares/Notification";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../constants/paths";
import { repaymentServices } from "../repaymentService";
import { depositServices } from "../../deposit/depositServices";
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import numeral from "numeral";
import moment from "moment";
import Button from "react-bootstrap/esm/Button";

export const RepaymentList = () => {

    const daysArray = [];
    const endOfOctober2024 = moment(moment().format('YYYY-MM')).endOf('month');

    for (let i = 0; i < 6; i++) {
        daysArray.push(endOfOctober2024.clone().subtract(i, 'days').format('DD'));
    }


    const [loading, setLoading] = useState(false);
    const [selectedDepositId, setSelectedDepositId] = useState("");
    const [showTotal, setShowTotal] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    const { repayments } = useSelector(state => state.repayment);
    const { deposits } = useSelector(state => state.deposit);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    /** OnChange Deposit ID */
    const onChangeDepositId = async (e) => {
        setSelectedDepositId(e);
        navigate(`${paths.repayment}/deposit/${e}`)
    }

    /** Loading This Month Repayment List */
    const thisMonthRepayment = async () => {
        setLoading(true);
        const result = await repaymentServices.indexthisMonth(dispatch, moment().format("MM"));
        const amounts = result.data.map((repayment) => {
            return repayment.amount;
        });

        let sum = 0;

        for (let i = 0; i < amounts.length; i++) {
            sum += amounts[i];
        }

        setTotalAmount(sum);
        setShowTotal(true);
        setLoading(false);
    }

    /** Loading Repayment By Deposit ID From URL */
    const loadingRepaymentByDepositId = useCallback(async () => {
        if (selectedDepositId) {
            setLoading(true);
            await repaymentServices.index(dispatch, selectedDepositId);
            setShowTotal(false);
            setLoading(false);
        }
    }, [dispatch, selectedDepositId]);

    /** Loading Deposit List */
    const initLoading = useCallback(async () => {
        setLoading(true);
        await depositServices.index(dispatch);
        setLoading(false);
    }, [dispatch]);

    /** Watch Deposit ID Change Event */
    useEffect(() => {
        if (params.deposit_id) {
            setSelectedDepositId(params.deposit_id);
            loadingRepaymentByDepositId();
        }
    }, [params.deposit_id, loadingRepaymentByDepositId]);

    /** Mount Initialization Data */
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
                                            <div className="col-12 col-md-12 col-lg-12 mt-3">
                                                <h4> Repayment Schedule </h4>
                                            </div>

                                            <div className="col-12 col-md-3 col-lg-3 mt-3">
                                                <Form.Group className="w-full">
                                                    <Form.Select
                                                        disabled={loading}
                                                        value={selectedDepositId}
                                                        onChange={(e) => onChangeDepositId(e.target.value)}
                                                    >
                                                        <option value={"NA"}> Choose Deposit </option>
                                                        {deposits && deposits.map((value, index) => {
                                                            return (
                                                                <option key={`deposit_id_${index}`} value={value.id}> {`Deposit ID - ${value.id}`} </option>
                                                            )
                                                        })}
                                                    </Form.Select>
                                                </Form.Group>
                                            </div>

                                            <div className="col-12 col-md-3 col-lg-3 mt-3">
                                                <Button
                                                    disabled={loading}
                                                    onClick={() => thisMonthRepayment()}
                                                >
                                                    <CalendarFill />
                                                    <small> This Month Repayment ({moment().format("MMMM, YYYY")} ) </small>
                                                </Button>
                                            </div>

                                            <div className="col-12 mt-3">
                                                <div className="table-responsive">
                                                    <table className="table table-sm table-dark">
                                                        <thead>
                                                            <tr className="agent-list-table-title">
                                                                <th scope="col"> ID </th>
                                                                <th scope="col"> Total <small> (Kyats) </small> </th>
                                                                <th scope="col"> Monthly <small> (Kyats) </small> </th>
                                                                <th scope="col"> Daily <small> (Kyats) </small> </th>
                                                                <th scope="col"> Total Days </th>
                                                                <th scope="col"> Days In Month </th>
                                                                <th scope="col"> Repayment Date </th>
                                                                <th scope="col"> Status </th>
                                                            </tr>
                                                        </thead>

                                                        <tbody className="agent-list-table-row">
                                                            {repayments && repayments.map((repayment, index) => {
                                                                return (
                                                                    <tr key={`deposit_id_${index}`} style={{ width: "100%" }}>
                                                                        <td
                                                                            style={{
                                                                                textDecoration: "underline #d3d3d3",
                                                                                cursor: "pointer",
                                                                            }}
                                                                            onClick={() => navigate(`${paths.repayment}/${repayment.id}`)}
                                                                        >
                                                                            {repayment.id}
                                                                        </td>
                                                                        <td> {numeral(repayment.total_amount).format('0,0')} </td>
                                                                        <td>
                                                                            {numeral(repayment.amount).format('0,0')}
                                                                        </td>
                                                                        <td>
                                                                            {numeral(repayment.oneday_amount).format('0,0')}
                                                                        </td>
                                                                        <td> {repayment.total_days} </td>
                                                                        <td> {repayment.count_days} </td>
                                                                        <td> {moment(repayment.date).format("DD/MM/YYYY")} </td>
                                                                        <td>
                                                                            <Badge bg={`${repayment.status === 'AVAILABLE_WITHDRAW' ? 'success' : "danger"}`}> {repayment.status} </Badge>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}

                                                            {showTotal && (
                                                                <tr>
                                                                    <td colSpan={2} style={{paddingTop: "20px", paddingBottom: "20px", fontWeight: "bolder"}}> Total Repayment Amount </td>
                                                                    <td colSpan={6} style={{paddingTop: "20px", paddingBottom: "20px", fontWeight: "bolder"}}>
                                                                        {numeral(totalAmount).format('0,0')} Kyats. We will run repayment payment transactions on
                                                                        <code>
                                                                            {`${moment().format("MMMM")} ${daysArray.reverse().toString()}`}
                                                                        </code>.
                                                                    </td>
                                                                </tr>
                                                            )}
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