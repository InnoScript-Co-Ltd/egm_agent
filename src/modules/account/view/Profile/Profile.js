import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useSelector } from "react-redux"
import { AlertMessage } from "../../../../shares/AlertMessage"
import { Header } from "../../../../shares/Header"
import { Notification } from "../../../../shares/Notification"
import { ChangePassword } from "../../entry/ChangePassword/ChangePassword"
import { ProfileUpdate } from "../../entry/ProfileUpdate/ProfileUpdate"
import { KYCUpdate } from "../../entry/KYCUpdate/KYCUpdate"
import { AccountUpdate } from "../../entry/AccountUpdate/AccountUpdate"
import { PaymentPassword } from "../../entry/PaymentPassword/PaymentPassword"
import { CreateBankAccount } from '../../entry/CreateBankAccount/CreateBankAccount';
import { BankAccountList } from '../BankAccountList/BankAccountList';
import "./profile.css";

export const Profile = () => {
    const { user } = useSelector(state => state.account);
    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <Notification />

                    <div className="col-sm-12 col-md-12 col-lg-12">
                        {user && user.status === 'ACTIVE' && (
                            <>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <div className="card" style={{ background: "#212529", color: "#fff" }}>
                                            <div className="card-title">
                                                <h5> Agent Profile </h5>
                                                <AlertMessage />
                                            </div>

                                            <div className="card-body">
                                                <Tabs
                                                    defaultActiveKey="personal"
                                                    className="mb-3"
                                                >
                                                    <Tab eventKey="personal" title="Personal Information">
                                                        <ProfileUpdate />
                                                    </Tab>

                                                    <Tab eventKey="kyc" title="KYC">
                                                        <KYCUpdate />
                                                    </Tab>

                                                    {user.kyc_status === "FULL_KYC" && (
                                                        <Tab eventKey="bank" title="Bank Account">
                                                            <CreateBankAccount />
                                                            <BankAccountList />
                                                        </Tab>
                                                    )}

                                                    <Tab eventKey="account" title="Account">
                                                        <AccountUpdate />
                                                    </Tab>

                                                    <Tab eventKey="security" title="Security">
                                                        <ChangePassword />
                                                        <PaymentPassword />
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