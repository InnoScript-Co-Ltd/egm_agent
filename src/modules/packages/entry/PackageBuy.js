import { useCallback, useEffect, useState } from "react"
import Table from 'react-bootstrap/Table';
import { AlertMessage } from "../../../shares/AlertMessage"
import { Header } from "../../../shares/Header"
import { SideMenu } from "../../../shares/SideMenu"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { packageServices } from "../packageServices"
import Accordion from 'react-bootstrap/Accordion';
import numeral from "numeral";
import moment from "moment";

export const PackageBuy = () => {

    const [loading, setLoading] = useState(false);
    const [repayment, setRepayment] = useState([]);
    const { packageDetail } = useSelector(state => state.package);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const params = useParams();

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
                    roi_rate: packageDetail.roi_rate,
                    roi_amount: (packageDetail.deposit_rate * packageDetail.roi_rate / 100)
                };

                repayments.push(futureMonth);
            }

            setRepayment(repayments);
        }
    }, [packageDetail]);

    useEffect(() => {
        initDataLoading();
    }, [initDataLoading]);

    useEffect(() => {
        repaymentDataLoading();
    }, [repaymentDataLoading]);

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

                        {!loading && packageDetail && (
                            <div className="row mt-3 mb-3">
                                <div className="col-12">
                                    <div className="card package-detail-card">
                                        <div className="card-title">
                                            <span className="card-text"> {packageDetail.name.toUpperCase()} (${numeral(packageDetail.deposit_rate).format('0,0')}) </span>
                                            <span className="card-sub-text">
                                                Duration - {packageDetail.duration} {packageDetail.duration > 1 ? "Years" : "Year"} |
                                                Monthly ROI - ({packageDetail.roi_rate}%) |
                                                Yearly ROI - ({packageDetail.roi_rate * 12}%)
                                            </span>
                                        </div>

                                        <div className="card-body">
                                            <Accordion defaultActiveKey="1" className="mt-3">
                                                <Accordion.Item eventKey="1">
                                                    <Accordion.Header> <b> Package Buying Process  </b> </Accordion.Header>
                                                    <Accordion.Body>

                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>

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
                                                                            <td colspan='2'> <b> Total ROI Amount </b></td>
                                                                            <td> <b> ${numeral(repayment[0].roi_amount * 12).format('0,0')} </b> </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td colspan='2'> <b> Disposit Amount </b></td>
                                                                            <td> <b> ${numeral(packageDetail.deposit_rate).format('0,0')} </b> </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td colspan='2'> <b> Total ROI Amount + Disposit Amount </b></td>
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