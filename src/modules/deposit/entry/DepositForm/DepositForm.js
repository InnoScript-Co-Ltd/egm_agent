import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useCallback, useEffect, useState, useRef } from "react";
import { Header } from "../../../../shares/Header";
import { Notification } from "../../../../shares/Notification";
import { depositServices } from "../../depositServices";
import { useDispatch, useSelector } from "react-redux";
import { depositPayload } from "../../depositPayload";
import { payloadHandler } from "../../../../helpers/handler";
import { ValidationMessage } from "../../../../shares/ValidationMessage";
import { formBuilder } from "../../../../libs/formBuilder";
import { CheckPaymentPassword } from '../../../../shares/CheckPaymentPassword/CheckPaymentPassword';
import { paths } from '../../../../constants/paths';
import { useNavigate } from 'react-router-dom';
import { Copy } from 'react-bootstrap-icons';
import { transcationServices } from '../../../transcation/transcationServices';
import { depositAmount } from '../../../../constants/config';
import "./deposit-form.css";

export const DepositForm = () => {

    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(null);
    const [payload, setPayload] = useState(depositPayload.create);
    const [bankAccounts, setBankAccount] = useState([]);
    const [checkPaymentPassword, setCheckPaymentPassword] = useState(false);
    const [selectMerchantAccount, setSelectMerechantAccount] = useState(null);
    const [selectedDepositAmount, setSelectedDepositAmount] = useState(null);

    const { user } = useSelector(state => state.account);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const merchantBankAccount = useRef();
    const depositAmounts = useRef(depositAmount);

    /** Copy Merchant Bank Account */
    const copyReferralLink = () => {
        const copyText = document.getElementById("merchant-bank-account").innerHTML;
        navigator.clipboard.writeText(copyText);
    }

    /** Deposit Transaction Request Handler */
    const depositTransactionRequest = async () => {
        setLoading(true);
        const updatePayload = {...payload};
        updatePayload.package_deposit_amount = selectedDepositAmount.value;
        
        const formData = formBuilder(updatePayload, depositPayload.create);
        const result = await transcationServices.store(dispatch, formData);

        if (result.status === 200) {
            navigate(paths.transaction);
        }

        setLoading(false);
    }

    /** Choose Agent Bank Account Handler */
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

    /** Initialization Merchant Bank Account Loading */
    const initMerchantBankAccountLoading = useCallback(async () => {
        const result = await depositServices.merchantBankAccount(dispatch);

        if (result.status === 200) {
            merchantBankAccount.current = result.data;
        }

    }, [dispatch]);

    /** Initialization Agent Bank Account  */
    const initLoading = useCallback(async () => {
        setLoading(true);
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

                    {user && user.allow_deposit && (
                        <div className="col-12 mt-3">
                            <div className="row">
                                <div className="col-12 col-md-12 mt-3">
                                    <div className="card" style={{ background: "#212529", color: "#fff" }}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12 mt-3">
                                                    <h4> Deposit Request </h4>
                                                </div>

                                                <div className='row'>
                                                    <div className='col-12 col-md-8 col-lg-8 mt-3'>
                                                        <div className='d-flex flex-row align-items-start justify-content-start flex-wrap gap-3'>
                                                            {depositAmounts.current.map((deposit, index) => {
                                                                return (
                                                                    <div
                                                                        key={`deposit_amount_id_${index}`}
                                                                        className={`deposit-amount-box ${selectedDepositAmount && selectedDepositAmount.label === deposit.label ? "active-deposit" : ""}`}
                                                                        onClick={() => setSelectedDepositAmount(deposit)}
                                                                    >
                                                                        <label> {deposit.label} </label>
                                                                    </div>
                                                                )
                                                            })}
                                                            <ValidationMessage field="package_deposit_amount" />
                                                        </div>

                                                        <div className='row mt-3'>
                                                            <div className="col-12 col-md-6 col-lg-6 mt-3">
                                                                <Form.Group className="w-full">
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

                                                            <div className="col-12 col-md-6 col-lg-6 mt-3">
                                                                <Form.Group className="w-full">
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

                                                            <div className='col-12 mt-3'>
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
                                                        </div>
                                                    </div>

                                                    <div className='col-12 col-md-4 col-lg-4 mt-3 merchant-bank-account-info'>
                                                        <h5> Merchant Bank Account Information </h5>
                                                        {selectMerchantAccount && (
                                                            <div className='d-flex flex-column justify-content-center align-items-start mt-3'>
                                                                <div className='w-full d-flex flex-row justify-content-between align-item-start mt-3'>
                                                                    <small> Bank Type </small>
                                                                    <small>  {selectMerchantAccount.bank_type} </small>
                                                                </div>

                                                                <div className='w-full d-flex flex-row justify-content-between align-item-start mt-3'>
                                                                    <small> Account Hodlder Name </small>
                                                                    <small> {selectMerchantAccount.holder_name} </small>
                                                                </div>

                                                                <div className='w-full d-flex flex-row justify-content-end align-item-start mt-3'>
                                                                    <span style={{ fontSize: "18px", marginTop: "20px" }}>
                                                                        <code id="merchant-bank-account"> {selectMerchantAccount.account_number} </code>
                                                                        <Copy size={28} style={{ marginLeft: "20px", cursor: "pointer" }} onClick={() => copyReferralLink()} />
                                                                    </span>
                                                                </div>


                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
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