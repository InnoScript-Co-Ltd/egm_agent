import { useSelector, useDispatch } from "react-redux"
import { useCallback, useEffect, useState } from "react";
import { Header } from "../../../shares/Header";
import { AlertMessage } from "../../../shares/AlertMessage";
import { SideMenu } from "../../../shares/SideMenu";
import { WalletFill } from "react-bootstrap-icons";
import numeral from "numeral"
import { dashboardService } from "../dashboardService";

export const Dashboard = () => {
    const { user } = useSelector(state => state.account);

    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(null);
    const dispatch = useDispatch();

    const initLoading = useCallback(async () => {
        setLoading(true);
        const result = await dashboardService.index(dispatch);

        if(result.status === 200) {
            setCount(result.data);
        }

        setLoading(false);
    },[dispatch]);

    useEffect(() => {
        initLoading();
    },[initLoading]);

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
                            <div className="row">
                                <div className="col-12">
                                    <h4> Your Deposit </h4>
                                </div>

                                <div className="col-12 col-md-3 mt-3">
                                    <div className="card card-primary">
                                        <div className="card-body">
                                            <div className="count-wrapper">
                                                <WalletFill size={50} style={{ fontWeight: "bolder" }} />
                                                { !loading && count && (
                                                    <span> {numeral(count.deposit_amount).format("0,0")} </span>
                                                )}
                                                
                                            </div>
                                            <span className="count-label"> Your Deposit (Kyats) </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-3 mt-3">
                                    <div className="card card-success">
                                        <div className="card-body">
                                            <div className="count-wrapper">
                                                <WalletFill size={50} style={{ fontWeight: "bolder" }} />
                                                { !loading && count && (
                                                    <span> {numeral(count.roi_amount).format("0,0")} </span>
                                                )}
                                                
                                            </div>
                                            <span className="count-label"> Monthly ROI (Kyats) </span>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-12 col-md-3 mt-3">
                                    <div className="card card-warning">
                                        <div className="card-body">
                                            <div className="count-wrapper">
                                                <WalletFill size={50} style={{ fontWeight: "bolder" }} />
                                                { !loading && count && (
                                                    <span> {numeral(0).format("0,0")} </span>
                                                )}
                                                
                                            </div>
                                            <span className="count-label">  Commission (Kyats) </span>
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