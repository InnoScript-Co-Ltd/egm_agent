import { useCallback, useEffect, useState } from "react"
import { Header } from "../../../shares/Header"
import { SideMenu } from "../../../shares/SideMenu"
import { packageServices } from "../packageServices";
import { useDispatch, useSelector } from "react-redux";
import { AlertMessage } from "../../../shares/AlertMessage";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/paths";
import numeral from "numeral";

export const PackageList = () => {

    const [loading, setLoading] = useState(false);

    const { packages } = useSelector(state => state.package);
    const { user } = useSelector(state => state.account);

    const [items, setItem] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadingPackage = useCallback(async () => {
        setLoading(true);
        await packageServices.index(dispatch);
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        loadingPackage();
    }, [loadingPackage]);

    useEffect(() => {
        if (packages) {
            setItem(packages);
        }
        console.log(packages);
    }, [packages]);

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-2 col-lg-2 g-0">
                        <SideMenu />
                    </div>

                    <div className="col-sm-12 col-md-10 col-lg-10">
                        <div className="row mt-3 mb-3">
                            <AlertMessage />
                        </div>

                        {!loading && (
                            <div className="row mt-3 mb-3">
                                {items && items.map((value, index) => {
                                    return (
                                        <div key={`package_id_${index}`} className="col-sm-12 col-md-3 col-lg-3 mb-3">
                                            <div className="card package-card">
                                                <div className="card-title">
                                                    <span className="card-text"> {value.name} </span>
                                                </div>

                                                <div className="card-body">
                                                    <div className="package-card-body">
                                                        <div className="package-item">
                                                            <span> Duration </span>
                                                            <span> {value.duration} {value.duration > 1 ? "Years" : "Year"} </span>
                                                        </div>

                                                        <div className="package-item">
                                                            <span> Monthly ROI (%) </span>
                                                            <span> {value.roi_rate} % </span>
                                                        </div>

                                                        <div className="package-item">
                                                            <span> Yearly ROI (%) </span>
                                                            <span> {value.roi_rate * 12} % </span>
                                                        </div>

                                                        <div className="divider"> </div>

                                                        <div className="package-item-description">
                                                            <span> ${numeral(value.deposit_rate).format('0,0')} </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card-footer">
                                                    {user.kyc_status === 'FULL_KYC' && (
                                                        <button
                                                            className="btn btn-primary"
                                                            disabled={loading}
                                                            onClick={() => navigate(`${paths.packageBuy}/${value.id}`)}
                                                        >
                                                            BUY PACKAGE
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}