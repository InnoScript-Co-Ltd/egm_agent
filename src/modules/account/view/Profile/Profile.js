import { useSelector } from "react-redux"
import { AlertMessage } from "../../../../shares/AlertMessage"
import { Header } from "../../../../shares/Header"
import { Notification } from "../../../../shares/Notification"
import { SideMenu } from "../../../../shares/SideMenu"
import Button from "react-bootstrap/esm/Button";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import { ChangePassword } from "../../entry/ChangePassword/ChangePassword"
import "./profile.css";
import { RefrenceLink } from "../RefrenceLink/RefrenceLink"
import { ProfileUpdate } from "../../entry/ProfileUpdate/ProfileUpdate"

export const Profile = () => {
    const { user } = useSelector(state => state.account);
    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-2 col-lg-2">
                        <SideMenu />
                    </div>

                    <Notification />

                    <div className="col-sm-12 col-md-10 col-lg-10">
                        <div className="row mt-3">
                            <AlertMessage />
                        </div>

                        {user && user.kyc_status === 'FULL_KYC' && user.status === 'ACTIVE' && (
                            <>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-title">
                                                <h5> Agent Account </h5>
                                            </div>

                                            <div className="card-body">
                                                <Tabs
                                                    defaultActiveKey="personal"
                                                    className="mb-3"
                                                >
                                                    <Tab eventKey="personal" title="Personal Information">
                                                        <ProfileUpdate />
                                                    </Tab>

                                                    <Tab eventKey="bankAccount" title="Bank Account ">
                                                        Tab content for Home
                                                    </Tab>

                                                    <Tab eventKey="refrenceLink" title="Refrence Link">
                                                        <RefrenceLink />
                                                    </Tab>

                                                    <Tab eventKey="security" title="Security">
                                                        <ChangePassword />
                                                    </Tab>
                                                </Tabs>
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