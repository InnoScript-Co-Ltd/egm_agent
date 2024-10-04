import { useSelector, useDispatch } from "react-redux"
import { useCallback, useEffect, useState } from "react";
import { Header } from "../../../shares/Header";
import { AlertMessage } from "../../../shares/AlertMessage";
import { Eye, EyeSlash, WalletFill } from "react-bootstrap-icons";
import { dashboardService } from "../dashboardService";
import numeral from "numeral";
import moment from "moment";

export const Dashboard = () => {
    const { user } = useSelector(state => state.account);

    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(null);
    const [depostShow, setDepostShow] = useState(false);
    const [rioShow, setRoiShow] = useState(false);
    const [thisMonthShow, setThisMonthShow] = useState(false);
    const dispatch = useDispatch();

    const daysArray = [];
    const endOfOctober2024 = moment("2024-10").endOf('month');

    for (let i = 0; i < 6; i++) {
        daysArray.push(endOfOctober2024.clone().subtract(i, 'days').format('DD'));
    }

    const initLoading = useCallback(async () => {
        setLoading(true);
        const result = await dashboardService.index(dispatch);
        if (result.status === 200) {
            console.log(result.data);
            setCount(result.data);
        }
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
                    <div className="col-sm-12">
                        <div className="row mt-3 mb-3">
                            <AlertMessage />
                        </div>

                        {user && user.kyc_status === 'FULL_KYC' && user.status === 'ACTIVE' && (
                            <div className="row">
                                <div className="col-12">
                                    <h4> Your Deposit </h4>
                                    <p> We will run repayment payment transactions for ROI in
                                        <code>
                                            {`${moment().format("MMMM")} ${daysArray.reverse().toString()}`}
                                        </code>. 
                                    </p>
                                </div>

                                <div className="col-12 col-md-3 mt-3">
                                    <div className="card card-primary">
                                        <div className="card-body">
                                            {!depostShow && (
                                                <Eye
                                                    size={25}
                                                    style={{ fontWeight: "bolder", cursor: "pointer", position: "absolute", top: "10px", right: "10px" }}
                                                    onClick={() => setDepostShow(!depostShow)}
                                                />
                                            )}

                                            {depostShow && (
                                                <EyeSlash
                                                    size={25}
                                                    style={{ fontWeight: "bolder", cursor: "pointer", position: "absolute", top: "10px", right: "10px" }}
                                                    onClick={() => setDepostShow(!depostShow)}
                                                />
                                            )}

                                            <div className="count-wrapper">
                                                <WalletFill size={50} style={{ fontWeight: "bolder" }} />
                                                {!loading && count && depostShow && (
                                                    <span> {numeral(count.total_deposit_amount).format("0,0")} </span>
                                                )}

                                                {!depostShow && (
                                                    <span> *** </span>
                                                )}

                                            </div>
                                            <span className="count-label"> Your Deposit (Kyats) </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-3 mt-3">
                                    <div className="card card-success">
                                        <div className="card-body">
                                            {!rioShow && (
                                                <Eye
                                                    size={25}
                                                    style={{ fontWeight: "bolder", cursor: "pointer", position: "absolute", top: "10px", right: "10px" }}
                                                    onClick={() => setRoiShow(!rioShow)}
                                                />
                                            )}

                                            {rioShow && (
                                                <EyeSlash
                                                    size={25}
                                                    style={{ fontWeight: "bolder", cursor: "pointer", position: "absolute", top: "10px", right: "10px" }}
                                                    onClick={() => setRoiShow(!rioShow)}
                                                />
                                            )}

                                            <div className="count-wrapper">
                                                <WalletFill size={50} style={{ fontWeight: "bolder" }} />
                                                {!loading && count && rioShow && (
                                                    <span> {numeral(count.total_repayment).format("0,0")} </span>
                                                )}

                                                {!rioShow && (
                                                    <span> *** </span>
                                                )}

                                            </div>
                                            <span className="count-label"> Availiable ROI (Kyats) </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-3 mt-3">
                                    <div className="card card-warning">
                                        <div className="card-body">
                                            {!thisMonthShow && (
                                                <Eye
                                                    size={25}
                                                    style={{ fontWeight: "bolder", cursor: "pointer", position: "absolute", top: "10px", right: "10px" }}
                                                    onClick={() => setThisMonthShow(!thisMonthShow)}
                                                />
                                            )}

                                            {thisMonthShow && (
                                                <EyeSlash
                                                    size={25}
                                                    style={{ fontWeight: "bolder", cursor: "pointer", position: "absolute", top: "10px", right: "10px" }}
                                                    onClick={() => setThisMonthShow(!thisMonthShow)}
                                                />
                                            )}

                                            <div className="count-wrapper">
                                                <WalletFill size={50} style={{ fontWeight: "bolder" }} />
                                                {!loading && count && thisMonthShow && (
                                                    <span> {numeral(count.this_month_repayment).format("0,0")} </span>
                                                )}

                                                {!thisMonthShow && (
                                                    <span> *** </span>
                                                )}

                                            </div>
                                            <span className="count-label"> This Month ({moment().format("MMM, YYYY")}) (Ks) </span>
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