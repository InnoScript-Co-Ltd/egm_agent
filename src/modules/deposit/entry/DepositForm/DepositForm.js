import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useCallback, useEffect, useState } from "react";
import { Header } from "../../../../shares/Header";
import { Notification } from "../../../../shares/Notification";
import { SideMenu } from "../../../../shares/SideMenu";
import { depositServices } from "../../depositServices";
import { useDispatch } from "react-redux";
import { depositPayload } from "../../depositPayload";
import { payloadHandler } from "../../../../helpers/handler";
import { ValidationMessage } from "../../../../shares/ValidationMessage";
import { formBuilder } from "../../../../libs/formBuilder";
import numeral from 'numeral';
import moment from 'moment';
import "./deposit-form.css";

export const DepositForm = () => {

    const [loading, setLoading] = useState(false);
    const [packages, setPackages] = useState([]);
    const [payload, setPayload] = useState(depositPayload.create);
    const [selectPackage, setSelectPackage] = useState(null);
    const [depositAmount, setDepositAmount] = useState([]);
    const [repayment, setRepayment] = useState([]);

    const dispatch = useDispatch();

    const packageChooseHander = (e) => {
        const choosePackage = packages.filter(value => Number(value.id) === Number(e.target.value))[0];
        setSelectPackage(choosePackage);
        setDepositAmount(choosePackage.deposit_amount);

        let repaymentUpdate = [];

        for (let x = 0; x < choosePackage.duration; x++) {
            repaymentUpdate.push({
                month: moment().add(x, 'M').format('DD-MM-YYYY'),
                roi_rate: selectPackage.roi_rate,
            });
        }

        setRepayment(repaymentUpdate);

        payloadHandler(payload, e.target.value, "package_id", (updatePayload) => {
            setPayload(updatePayload);
        });
    }

    const depositRequest = async () => {
        setLoading(true);
        const formData = formBuilder(payload, depositPayload.create);
        await depositServices.store(formData, dispatch);
        setLoading(false);
    }

    const initLoading = useCallback(async () => {
        setLoading(true);
        const result = await depositServices.packages(dispatch);

        if (result.status === 200 && result.data.length > 0) {
            setPackages(result.data);
            const updatePayload = {
                package_id: result.data[0].id,
                desposit_amount: result.data[0].deposit_amount[0]
            }
            setDepositAmount(result.data[0].deposit_amount);
            setSelectPackage(result.data[0]);

            let repaymentUpdate = [];

            for (let x = 0; x < result.data[0].duration; x++) {
                repaymentUpdate.push({
                    month: moment().add(x, 'M').format('DD-MM-YYYY'),
                    roi_rate: result.data[0].roi_rate,
                });
            }

            setRepayment(repaymentUpdate);

            setPayload(updatePayload);
        };

        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        initLoading();
    }, [initLoading]);

    return (
        <>
            <Header />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-2 col-lg-2">
                        <SideMenu />
                    </div>

                    <Notification />

                    <div className="col-sm-12 col-md-10 col-lg-10 mt-3">
                        <div className="row">
                            <div className="col-12 col-md-12 mt-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 mt-3">
                                                <h4> Deposit Request </h4>

                                                {selectPackage && (
                                                    <div className="alert alert-warning" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start" }}>
                                                        <span> Package Name - {selectPackage.name} </span>
                                                        <span> Duration - {selectPackage.duration} Months </span>
                                                        <span> ROI - {selectPackage.roi_rate} % </span>
                                                        <span>
                                                            {selectPackage.deposit_amount.map((value, index) => {
                                                                return (
                                                                    <label key={`deposit_id_${index}`} style={{ marginRight: "20px" }}> {numeral(value).format("0,0")} Kyats </label>
                                                                )
                                                            })}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="col-12 col-md-3 col-lg-3">
                                                <Form.Group className="mt-3 w-full">
                                                    <Form.Select
                                                        disabled={loading}
                                                        value={payload.package_id}
                                                        onChange={(e) => packageChooseHander(e)}
                                                    >
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
                                                        value={payload.deposit_amount}
                                                        onChange={(e) => payloadHandler(payload, e.target.value, "deposit_amount", (updatePayload) => {
                                                            setPayload(updatePayload);
                                                        })}
                                                    >
                                                        {depositAmount && depositAmount.map((value, index) => {
                                                            return (
                                                                <option key={`deposit_amount_id_${index}`} value={value}> {numeral(value).format('0,0')} </option>
                                                            )
                                                        })}
                                                    </Form.Select>
                                                    <ValidationMessage field="deposit_amount" />
                                                </Form.Group>
                                            </div>

                                            <div className="col-12 col-md-3 col-lg-3">
                                                <Form.Group className="mt-3 w-full">
                                                    <Form.Control
                                                        type="file"
                                                        disabled={loading}
                                                        onChange={(e) => payloadHandler(payload, e.target.value, "transaction_screenshoot", (updatePayload) => {
                                                            setPayload(updatePayload);
                                                        })}
                                                    />
                                                    <ValidationMessage field="transaction_screenshoot" />
                                                </Form.Group>
                                            </div>

                                            <div className="col-12 col-md-2 col-lg-2">
                                                <Form.Group className="mt-3 w-full">
                                                    <Button
                                                        className="w-full"
                                                        variant="warning"
                                                        disabled={loading}
                                                        onClick={() => depositRequest()}
                                                    >
                                                        Deposit
                                                    </Button>
                                                </Form.Group>
                                            </div>
                                        </div>

                                        {selectPackage && (
                                            <div className='row'>
                                                <div className='col-12 mt-3'>
                                                    <Tabs
                                                        defaultActiveKey={`${selectPackage.id}_${selectPackage.deposit_amount[0]}`}
                                                        className="mb-3"
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
                </div>
            </div >
        </>
    )
}