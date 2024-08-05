import { useSelector } from "react-redux";
import { AlertMessage } from "../../../shares/AlertMessage";
import { Header } from "../../../shares/Header"
import { SideMenu } from "../../../shares/SideMenu";

export const TranscationDetail = () => {

    const { user } = useSelector(state => state.account);

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

                        {user && user.kyc_status === 'FULL_KYC' && (
                            <>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <div className="d-flex flex-row justify-content-between align-item-center">

                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-3 mb-3">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-title">
                                                <div className="transcation-card-text"> Transcation Detail </div>
                                            </div>

                                            <div className="card-body">
                                            </div>
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