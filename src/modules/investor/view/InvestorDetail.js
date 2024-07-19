import { useCallback, useEffect, useState } from "react";
import { AlertMessage } from "../../../shares/AlertMessage"
import { Header } from "../../../shares/Header"
import { SideMenu } from "../../../shares/SideMenu"
import { useDispatch, useSelector } from "react-redux";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { investorServices } from "../investorServices";
import { useParams } from "react-router-dom";

export const InvestorDetail = () => {
    const [loading, setLoading] = useState(false);

    const { investor } = useSelector(state => state.investor);
    const { user } = useSelector(state => state.account);

    const params = useParams();
    const dispatch = useDispatch();

    const loadingInvestorData = useCallback( async () => {
        setLoading(true);
        await investorServices.show(params.id, dispatch);
        setLoading(false);
    },[dispatch, params.id]);

    useEffect(() => {
        loadingInvestorData();
    },[loadingInvestorData])

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
                                <div className="row mt-3 mb-3">
                                    {investor && (
                                        <div className="col-12">
                                            <Tabs
                                                defaultActiveKey="personal_info"
                                                id="uncontrolled-tab-example"
                                                className="mb-3"
                                            >
                                                <Tab eventKey="personal_info" title="Personal Information">
                                                    <div className="card">
                                                        <div className="card-title">
                                                            <div className="card-text"> Personal Information </div>
                                                        </div>

                                                        <div className="card-body">
                                                            <div className="w-full d-flex flex-row">
                                                                <span> Name </span>
                                                                <spam> {`${investor.first_name} ${investor.last_name}`} </spam>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tab>
                                                <Tab eventKey="package" title="Package">
                                                    Tab content for Profile
                                                </Tab>

                                                <Tab eventKey="transcation" title="Transcation">
                                                    Tab content for Contact
                                                </Tab>
                                            </Tabs>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}