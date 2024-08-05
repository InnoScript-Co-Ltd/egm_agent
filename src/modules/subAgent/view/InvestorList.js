import Button from "react-bootstrap/esm/Button";
import Table from 'react-bootstrap/Table';
import { AlertMessage } from "../../../shares/AlertMessage";
import { Header } from "../../../shares/Header";
import { SideMenu } from "../../../shares/SideMenu";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/paths";
import { useDispatch, useSelector } from "react-redux";
import { investorServices } from "../investorServices";

export const InvestorList = () => {

    const [loading, setLoading] = useState(false);

    const { investors } = useSelector(state => state.investor);
    const { user } = useSelector(state => state.account);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loadingInvestorlist = useCallback(async () => {
        setLoading(true);
        await investorServices.index(dispatch);
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        loadingInvestorlist();
    }, [loadingInvestorlist]);


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
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <div className="d-flex flex-row justify-content-between align-item-center">

                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-3 mb-3">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-title">
                                                <Button
                                                    variant="warning"
                                                    disabled={loading}
                                                    onClick={() => navigate(`${paths.investor}/new`)}
                                                >
                                                    Create Investor Account
                                                </Button>
                                            </div>

                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <Table striped bordered hover>
                                                        <tbody>
                                                            {investors && investors.map((value, index) => {
                                                                return (
                                                                    <tr key={`investor_id_${index}`} className="tr">
                                                                        <td style={{ width: "200px" }}> {`${value.first_name} ${value.last_name}`} </td>
                                                                        <td style={{ width: "200px" }}> {value.email} </td>
                                                                        <td> {value.phone} </td>
                                                                        <td> {value.kyc_status} </td>
                                                                        <td> {value.status} </td>
                                                                        <td>
                                                                            <Button
                                                                                className="btn-small"
                                                                                size="small"
                                                                                variant="warning"
                                                                                disabled={loading}
                                                                                onClick={() => navigate(`${paths.investor}/${value.id}`)}
                                                                            >
                                                                                Detail
                                                                            </Button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </Table>
                                                </div>
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