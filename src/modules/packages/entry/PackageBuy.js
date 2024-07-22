import { useCallback, useEffect, useRef, useState } from "react"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button"
import Table from 'react-bootstrap/Table';
import { AlertMessage } from "../../../shares/AlertMessage"
import { Header } from "../../../shares/Header"
import { SideMenu } from "../../../shares/SideMenu"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { packageServices } from "../packageServices"
import Accordion from 'react-bootstrap/Accordion';
import numeral from "numeral";
import moment from "moment";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { Notification } from "../../../shares/Notification";
import { ValidationMessage } from "../../../shares/ValidationMessage";

export const PackageBuy = () => {

    const [loading, setLoading] = useState(false);
    const [repayment, setRepayment] = useState([]);
    const [investors, setInvestors] = useState([]);
    
    const selectedInvestor = useRef();

    const { packageDetail } = useSelector(state => state.package);

    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const params = useParams();

    const requestPackageBuy = async () => {
        setLoading(true);
        await packageServices.agentPackageBuy(dispatch, {
            package_id: params.id
        });
        setLoading(false);
    }

    const requestInvestorPackageBuy = async () => {
        setLoading(true);

        await packageServices.investorPackageBuy(dispatch, {
            package_id: params.id,
            investor_id: selectedInvestor.current
        });
        setLoading(false);
    }

    const initDataLoading = useCallback(async () => {
        setLoading(true);
        await packageServices.show(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params.id]);

    const repaymentDataLoading = useCallback(() => {
        if (packageDetail) {
            let repayments = [];

            for (let x = 0; x < 12; x++) {

                const futureMonth = {
                    month: moment().add(x, 'M').format('DD-MM-YYYY'),
                    roi_rate: Number(packageDetail.roi_rate),
                    roi_amount: (Number(packageDetail.deposit_rate) * Number(packageDetail.roi_rate) / 100)
                };
                repayments.push(futureMonth);
            }

            setRepayment(repayments);
        }
    }, [packageDetail]);

    const investorListLoading = useCallback(async () => {
        setLoading(true);
        const result = await getRequest(`${endpoints.invsetor}?filter=kyc_status,status&value=FULL_KYC,ACTIVE`);

        if (result.status === 200) {
            setInvestors(result.data);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        initDataLoading();
    }, [initDataLoading]);

    useEffect(() => {
        repaymentDataLoading();
    }, [repaymentDataLoading]);

    useEffect(() => {
        investorListLoading();
    }, [investorListLoading])

    return (
        <>
            <Notification />
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

                        {!loading && packageDetail && (
                            <div className="row mt-3 mb-3">
                                <div className="col-12">
                                    <div className="card package-detail-card">
                                        <div className="card-title">
                                            <div className="d-flex flex-column justify-start align-items-start">
                                                <span> {packageDetail.name.toUpperCase()} (${numeral(packageDetail.deposit_rate).format('0,0')})  </span>
                                                <span className="card-sub-text">
                                                    Duration - {packageDetail.duration} {packageDetail.duration > 1 ? "Years" : "Year"} |
                                                    Monthly ROI - ({packageDetail.roi_rate}%) |
                                                    Yearly ROI - ({packageDetail.roi_rate * 12}%)
                                                </span>
                                            </div>

                                            <Button
                                                style={{ fontWeight: "600" }}
                                                variant="warning"
                                                disabled={loading}
                                                onClick={() => requestPackageBuy()}
                                            >
                                                Request Package Buy
                                            </Button>
                                        </div>

                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12">
                                                    <h3 style={{ fontSize: "16px" }}> Request Package Buy For Investor </h3>
                                                </div>

                                                <div className="col-12 col-md-4 col-lg-4">
                                                    <Form.Select
                                                        onChange={(e) => {
                                                            selectedInvestor.current = (e.target.value);
                                                        }}
                                                    >
                                                        <option> Choose Investor </option>
                                                        {investors && investors.map((value, index) => {
                                                            return (
                                                                <option key={`investor_id_${index}`} value={value.id}>  {`${value.first_name} ${value.last_name}`} </option>
                                                            )
                                                        })}
                                                    </Form.Select>
                                                    <ValidationMessage field="investor_id" />
                                                </div>

                                                <div className="col-12 col-md-4 col-lg-4">
                                                    <Button
                                                        style={{ fontWeight: "600" }}
                                                        variant="warning"
                                                        disabled={loading}
                                                        onClick={() => requestInvestorPackageBuy()}
                                                    >
                                                        Request Package
                                                    </Button>
                                                </div>

                                            </div>

                                            <Accordion defaultActiveKey="0" className="mt-3">
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header> <b> Repayment Schedule  </b> </Accordion.Header>
                                                    <Accordion.Body>
                                                        <Table striped bordered hover>
                                                            <thead>
                                                                <tr>
                                                                    <th>Month</th>
                                                                    <th> ROI Rate </th>
                                                                    <th> ROI Amount </th>
                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                {repayment && repayment.map((value, index) => {
                                                                    return (
                                                                        <tr key={`repayment_id_${index}`}>
                                                                            <td> {value.month} </td>
                                                                            <td> {value.roi_rate}% </td>
                                                                            <td> ${numeral(value.roi_amount).format('0,0')} </td>
                                                                        </tr>
                                                                    )
                                                                })}

                                                                {repayment && repayment.length > 0 && (
                                                                    <>
                                                                        <tr>
                                                                            <td colSpan={2}> <b> Total ROI Amount </b></td>
                                                                            <td> <b> ${numeral(repayment[0].roi_amount * 12).format('0,0')} </b> </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td colSpan={2}> <b> Disposit Amount </b></td>
                                                                            <td> <b> ${numeral(packageDetail.deposit_rate).format('0,0')} </b> </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td colSpan={2}> <b> Total ROI Amount + Disposit Amount </b></td>
                                                                            <td> <b> ${numeral((repayment[0].roi_amount * 12) + Number(packageDetail.deposit_rate)).format('0,0')} </b> </td>
                                                                        </tr>
                                                                    </>
                                                                )}
                                                            </tbody>
                                                        </Table>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}