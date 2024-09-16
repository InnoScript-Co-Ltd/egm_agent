import { useSelector } from "react-redux";
import { AlertMessage } from "../../../shares/AlertMessage";
import { Header } from "../../../shares/Header"
import { SideMenu } from "../../../shares/SideMenu";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { transcationServices } from "../transcationServices";
import { useParams } from "react-router-dom"
import { Status } from "../../../shares/Status/Status";
import moment from "moment";
import Button from "react-bootstrap/esm/Button";

export const TranscationDetail = () => {

    const [loading, setLoading] = useState(false);

    const { user } = useSelector(state => state.account);
    const { transaction } = useSelector(state => state.transaction);

    const dispatch = useDispatch();
    const params = useParams();

    const initLoading = useCallback(async () => {
        setLoading(true);
        await transcationServices.show(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params.id]);

    useEffect(() => {
        initLoading();
    }, [initLoading])
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
                            <>
                                {!loading && transaction && (
                                    <div className="row mt-3 mb-3">
                                        <div className="col-12">
                                            <div className="card" style={{ background: "#212529", color: "#fff" }}>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-12 col-md-6 col-lg-6 mb-3">
                                                            <h5 className="mb-3"> Transcation Record </h5>
                                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                                <small> Transcation ID </small>
                                                                <small> {transaction.id} </small>
                                                            </div>

                                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                                <small> Status </small>
                                                                <small> <Status status={transaction.status} /> </small>
                                                            </div>

                                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                                <small> Created Date </small>
                                                                <small> {moment(transaction.created_at).format("DD/MM/YYYY hh:mm:ss")} </small>
                                                            </div>

                                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                                <small> Updated Date </small>
                                                                <small> {moment(transaction.updated_at).format("DD/MM/YYYY hh:mm:ss")} </small>
                                                            </div>

                                                            <Button
                                                                className="w-full"

                                                            >
                                                                View Transaction Screenshoot
                                                            </Button>
                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-6 mb-3">
                                                            <h5 className="mb-3"> Package </h5>
                                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                                <small> Package Name </small>
                                                                <small> {transaction.package_name} </small>
                                                            </div>

                                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                                <small> Duration </small>
                                                                <small> {transaction.package_duration} Months </small>
                                                            </div>

                                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                                <small> ROI Rate </small>
                                                                <small> {transaction.package_roi_rate} % </small>
                                                            </div>

                                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                                <small> Commission </small>
                                                                <small> 1 % </small>
                                                            </div>

                                                            <Button
                                                                className="w-full"

                                                            >
                                                                View Package Detail
                                                            </Button>
                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-6 mb-3">
                                                            <h5 className="mb-3"> Agent's Bank Account </h5>
                                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                                <small> Name </small>
                                                                <small> {transaction.sender_name} </small>
                                                            </div>

                                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                                <small> Phone </small>
                                                                <small> {transaction.sender_phone} </small>
                                                            </div>

                                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                                <small> Email </small>
                                                                <small> {transaction.sender_email} </small>
                                                            </div>

                                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                                <small> NRC </small>
                                                                <small> {transaction.sender_nrc} </small>
                                                            </div>

                                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                                <small> Holder Name </small>
                                                                <small> {transaction.sender_account_name} </small>
                                                            </div>

                                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                                <small> Account Number </small>
                                                                <small> {transaction.sender_account_number} </small>
                                                            </div>

                                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                                <small> Bank Type </small>
                                                                <small> {transaction.bank_type} </small>
                                                            </div>

                                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                                <small> Branch </small>
                                                                <small> {transaction.sender_bank_branch} </small>
                                                            </div>

                                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                                <small> Address </small>
                                                                <small> {transaction.sender_bank_address} </small>
                                                            </div>
                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-6 mb-3">
                                                            <h5 className="mb-3"> Merchant's Bank Account </h5>
                                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                                <small> Holder Name </small>
                                                                <small> {transaction.merchant_account_name} </small>
                                                            </div>

                                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                                <small> Account Number </small>
                                                                <small> {transaction.merchant_account_number} </small>
                                                            </div>

                                                            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                                                                <small> Bank Type </small>
                                                                <small> {transaction.bank_type} </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}