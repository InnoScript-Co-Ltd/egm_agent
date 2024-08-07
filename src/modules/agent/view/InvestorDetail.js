import { useCallback, useEffect, useState } from "react";
import { AlertMessage } from "../../../shares/AlertMessage"
import { Header } from "../../../shares/Header"
import { SideMenu } from "../../../shares/SideMenu"
import { useDispatch, useSelector } from "react-redux";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { investorServices } from "../investorServices";
import { useParams } from "react-router-dom";
import { InvestorProfile } from "./InvestorProfile";

export const InvestorDetail = () => {
    const [loading, setLoading] = useState(false);

    const { investor } = useSelector(state => state.investor);
    const { user } = useSelector(state => state.account);

    const params = useParams();
    const dispatch = useDispatch();

    const loadingInvestorData = useCallback(async () => {
        setLoading(true);
        await investorServices.show(params.id, dispatch);
        setLoading(false);
    }, [dispatch, params.id]);

    useEffect(() => {
        loadingInvestorData();
    }, [loadingInvestorData])

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

                        {user && user.kyc_status === 'FULL_KYC' && (
                            <>
                                <InvestorProfile />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}