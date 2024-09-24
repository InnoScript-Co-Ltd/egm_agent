import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Alert from 'react-bootstrap/Alert';
import { useCallback, useEffect, useState, useRef } from "react";
import { Header } from "../../../../shares/Header";
import { Notification } from "../../../../shares/Notification";
import { depositServices } from "../../depositServices";
import { useDispatch } from "react-redux";
import { depositPayload } from "../../depositPayload";
import { payloadHandler } from "../../../../helpers/handler";
import { ValidationMessage } from "../../../../shares/ValidationMessage";
import { formBuilder } from "../../../../libs/formBuilder";
import { CheckPaymentPassword } from '../../../../shares/CheckPaymentPassword/CheckPaymentPassword';
import { paths } from '../../../../constants/paths';
import { useNavigate } from 'react-router-dom';
import { Copy } from 'react-bootstrap-icons';
import { transcationServices } from '../../../transcation/transcationServices';
import numeral from 'numeral';
import moment from 'moment';
import "./deposit-form.css";

export const DepositForm = () => {

    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(null);
    const [packages, setPackages] = useState([]);
    const [payload, setPayload] = useState(depositPayload.create);
    const [selectPackage, setSelectPackage] = useState(null);
    const [depositAmount, setDepositAmount] = useState([]);
    const [repayment, setRepayment] = useState([]);
    const [bankAccounts, setBankAccount] = useState([]);
    const [checkPaymentPassword, setCheckPaymentPassword] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [selectMerchantAccount, setSelectMerechantAccount] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const merchantBankAccount = useRef();

    const copyReferralLink = () => {
        const copyText = document.getElementById("merchant-bank-account").innerHTML;
        navigator.clipboard.writeText(copyText);
    }

    const packageChooseHander = (e) => {
        if (e.target.value !== "NA") {
            const choosePackage = packages.filter(value => Number(value.id) === Number(e.target.value))[0];
            setSelectPackage(choosePackage);
            setDepositAmount(choosePackage.deposit_amount);

            payloadHandler(payload, choosePackage.deposit_amount[0], "deposit_amount", (updatePayload) => {
                setPayload(updatePayload);
            });

            let repaymentUpdate = [];

            for (let x = 0; x < choosePackage.duration; x++) {
                repaymentUpdate.push({
                    month: moment().add(x, 'M').format('DD-MM-YYYY'),
                    roi_rate: choosePackage.roi_rate,
                });
            }

            setRepayment(repaymentUpdate);

            payloadHandler(payload, e.target.value, "package_id", (updatePayload) => {
                setPayload(updatePayload);
            });
        }
    }

    /** Deposit Transaction Request Handler */
    const depositTransactionRequest = async () => {
        setLoading(true);
        const formData = formBuilder(payload, depositPayload.create);
        const result = await transcationServices.store(dispatch, formData);

        if (result.status === 200) {
            setShowInfo(true);
        }

        setLoading(false);
    }

    const chooseAgentBankAccount = async (e) => {
        const selectAgentBankAccount = bankAccounts.filter(value => Number(value.id) === Number(e))[0];
        const chooseMerchantBankAccount = merchantBankAccount.current.filter(value => value.bank_type_label === selectAgentBankAccount.bank_type_label)[0];

        const updatePayload = { ...payload };
        updatePayload.bank_account_id = selectAgentBankAccount.id;
        updatePayload.bank_type = selectAgentBankAccount.bank_type;

        if (chooseMerchantBankAccount) {
            setSelectMerechantAccount(chooseMerchantBankAccount);
            updatePayload.merchant_account_id = chooseMerchantBankAccount.id;
        } else {
            setSelectMerechantAccount(null);
        }

        setPayload(updatePayload);
    }

    const initMerchantBankAccountLoading = useCallback(async () => {
        const result = await depositServices.merchantBankAccount(dispatch);

        if (result.status === 200) {
            console.log(result.data);
            merchantBankAccount.current = result.data;
        }

    }, [dispatch]);

    const initLoading = useCallback(async () => {
        setLoading(true);
        const resultPackage = await depositServices.packages(dispatch);

        if (resultPackage.status === 200) {
            setPackages(resultPackage.data);
        };

        const bankAccountResult = await depositServices.bankAccount(dispatch);

        if (bankAccountResult.status === 200) {
            setBankAccount(bankAccountResult.data);
        }

        if (bankAccountResult.status === 200 && bankAccountResult.data.length === 0) {
            setShowMessage("Deposit process need your bank account informaiton and please add bank account information from porfile setting.");
        }
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        initLoading();
    }, [initLoading]);

    useEffect(() => {
        initMerchantBankAccountLoading();
    }, [initMerchantBankAccountLoading])

    useEffect(() => {
        if (merchantBankAccount.length > 0 && bankAccounts.length > 0) {
            const bankAccount = merchantBankAccount.filter(value => value.bank_type_label === bankAccounts[0].bank_type_label);
            if (bankAccount.length > 0) {
                setSelectMerechantAccount(bankAccount[0]);
            } else {
                setSelectMerechantAccount(null);
            }
        }
    }, [merchantBankAccount, bankAccounts]);

    return (
        <>
            <Header />

            <div className="container-fluid">
                <div className="row">
                    <Notification />

                    {showMessage && (
                        <div className='col-12 mt-3'>
                            <Alert>
                                <div className='d-flex flex-column'>
                                    <p> {showMessage} </p>
                                    <Button style={{ width: "200px" }} onClick={() => navigate(paths.profile)}> Add Bank Account </Button>
                                </div>
                            </Alert>
                        </div>
                    )}

                    {showMessage === null && (
                        <div className="col-12 mt-3">
                            <div className="row">
                                <div className="col-12 col-md-12 mt-3">
                                    <div className="card" style={{ background: "#212529", color: "#fff" }}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12 mt-3">
                                                    <h4> Deposit Request </h4>
                                                </div>

                                                {selectMerchantAccount && (
                                                    <div className="col-12 col-md-12 col-lg-12 mt-3 mb-3">
                                                        <h5> Merchant Bank Account Information </h5>
                                                        <div className='d-flex flex-column justify-content-center align-items-start'>
                                                            <small> Bank Type - {selectMerchantAccount.bank_type} </small>
                                                            <small> Account Hodlder Name - {selectMerchantAccount.holder_name} </small>
                                                            <span style={{fontSize: "18px", marginTop: "20px"}}> 
                                                                <code id="merchant-bank-account"> {selectMerchantAccount.account_number} </code>  
                                                                <Copy size={28} style={{marginLeft: "20px", cursor: "pointer"}} onClick={() => copyReferralLink()} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}


                                                <div className="col-12 col-md-3 col-lg-3">
                                                    <Form.Group className="mt-3 w-full">
                                                        <Form.Select
                                                            disabled={loading}
                                                            value={payload.package_id}
                                                            onChange={(e) => packageChooseHander(e)}
                                                        >
                                                            <option value={"NA"}> Choose Package </option>
                                                            {packages && packages.map((value, index) => {
                                                                return (
                                                                    <option key={`package_id_${index}`} value={value.id}> {value.name} </option>
                                                                )
                                                            })}
                                                        </Form.Select>
                                                        <ValidationMessage field="package_id" />
                                                    </Form.Group>
                                                </div>

                                                <div className="col-12 col-md-3 col-lg-3">
                                                    <Form.Group className="mt-3 w-full">
                                                        <Form.Select
                                                            disabled={loading}
                                                            value={payload.package_deposit_amount}
                                                            onChange={(e) => payloadHandler(payload, e.target.value, "package_deposit_amount", (updatePayload) => {
                                                                setPayload(updatePayload);
                                                            })}
                                                        >
                                                            <option value={"NA"}> Choose Deposit Amount </option>
                                                            {depositAmount && depositAmount.map((value, index) => {
                                                                return (
                                                                    <option key={`deposit_amount_id_${index}`} value={value}> {numeral(value).format('0,0')} </option>
                                                                )
                                                            })}
                                                        </Form.Select>
                                                        <ValidationMessage field="package_deposit_amount" />
                                                    </Form.Group>
                                                </div>

                                                <div className="col-12 col-md-3 col-lg-3">
                                                    <Form.Group className="mt-3 w-full">
                                                        <Form.Select
                                                            disabled={loading}
                                                            value={payload.bank_account_id}
                                                            onChange={(e) => chooseAgentBankAccount(e.target.value)}
                                                        >
                                                            <option value={"NA"}> Choose Bank Account </option>
                                                            {bankAccounts && bankAccounts.map((value, index) => {
                                                                return (
                                                                    <option key={`bank_account_id_${index}`} value={value.id}> {`${value.bank_type} - ${value.account_number}`} </option>
                                                                )
                                                            })}
                                                        </Form.Select>
                                                        <ValidationMessage field="bank_account_id" />
                                                        <ValidationMessage field="merchant_bank_account_id" />
                                                    </Form.Group>
                                                </div>

                                                <div className="col-12 col-md-3 col-lg-3">
                                                    <Form.Group className="mt-3 w-full">
                                                        <Form.Control
                                                            type="file"
                                                            disabled={loading}
                                                            onChange={(e) => payloadHandler(payload, e.target.files[0], "transaction_screenshoot", (updatePayload) => {
                                                                setPayload(updatePayload);
                                                            })}
                                                        />
                                                        <ValidationMessage field="transaction_screenshoot" />
                                                    </Form.Group>
                                                </div>

                                                <div className="col-12 col-md-12 col-lg-12">
                                                    <div className='d-flex flex-row justify-content-end align-items-center'>
                                                        <Form.Group className="mt-3">
                                                            <Button
                                                                className="w-full"
                                                                variant="warning"
                                                                disabled={loading}
                                                                onClick={() => setCheckPaymentPassword(true)}
                                                            >
                                                                Deposit
                                                            </Button>
                                                        </Form.Group>
                                                    </div>
                                                </div>

                                                {showInfo && (
                                                    <div className="col-12 col-md-12 col-lg-12 mt-3">
                                                        <Alert variant={"primary"}>
                                                            <div className='d-flex flex-column justify-content-center align-items-start'>
                                                                <p> We are checking your payment transaction. Payment transaction process will take 24 hours.  </p>
                                                                <Button
                                                                    variant="warning"
                                                                    disabled={loading}
                                                                    onClick={() => navigate(paths.transaction)}
                                                                >
                                                                    Check Payment Transaction
                                                                </Button>
                                                            </div>
                                                        </Alert>
                                                    </div>
                                                )}

                                            </div>

                                            {selectPackage && (
                                                <div className='row'>
                                                    <div className='col-12 mt-3'>
                                                        <Tabs
                                                            defaultActiveKey={`${selectPackage.id}_${selectPackage.deposit_amount[0]}`}
                                                            className="mb-3"
                                                            style={{ background: "#212529", color: "#fff" }}
                                                        >
                                                            {depositAmount.map((value, index) => {
                                                                return (
                                                                    <Tab
                                                                        key={`tab_id_${index}`}
                                                                        eventKey={`${selectPackage.id}_${value}`}
                                                                        title={`${selectPackage.name} / ${numeral(value).format('0,0')}`}
                                                                    >
                                                                        <div className="table-responsive">
                                                                            <table className="table table-sm table-dark">
                                                                                <thead>
                                                                                    <tr className="agent-list-table-title">
                                                                                        <th scope="col"> Month </th>
                                                                                        <th scope="col"> ROI Rate (%) </th>
                                                                                        <th scope="col"> Commission Rate (%) </th>
                                                                                        <th scope="col"> Deposit Amount <small> (Kyats) </small> </th>
                                                                                        <th scope="col"> ROI Amount <small> (Kyats) </small> </th>
                                                                                        <th scope="col"> Commission Amount <small> (Kyats) </small> </th>
                                                                                    </tr>
                                                                                </thead>

                                                                                <tbody className="agent-list-table-row">
                                                                                    {repayment.map((repaymentValue, repaymentIndex) => {
                                                                                        return (
                                                                                            <tr key={`repayment_id_${repaymentIndex}`}>
                                                                                                <td> {repaymentValue.month} </td>
                                                                                                <td> {repaymentValue.roi_rate} </td>
                                                                                                <td> 1 </td>
                                                                                                <td> {numeral(value).format('0,0')} </td>
                                                                                                <td> {numeral(value * repaymentValue.roi_rate / 100).format('0,0')} </td>
                                                                                                <td> {numeral(value * 1 / 100).format('0,0')} </td>
                                                                                            </tr>
                                                                                        )
                                                                                    })}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </Tab>
                                                                )
                                                            })}
                                                        </Tabs>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <CheckPaymentPassword
                show={checkPaymentPassword}
                onClose={(e) => setCheckPaymentPassword(e)}
                callbackfn={() => depositTransactionRequest()}
            />
        </>
    )
}