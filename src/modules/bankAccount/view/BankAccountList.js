import { useCallback, useEffect, useState } from "react"
import { AlertMessage } from "../../../shares/AlertMessage"
import { Header } from "../../../shares/Header"
import { SideMenu } from "../../../shares/SideMenu"
import { useDispatch, useSelector } from "react-redux"
import { bankAccountServices } from "../bankAccountServices"
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import { AddNewBankAccount } from "../entry/AddNewBankAccount"

export const BankAccountList = () => {

    const [loading, setLoading] = useState(false);
    const [bankAccount, setBankAccount] = useState([]);

    const { bankAccounts } = useSelector(state => state.bankAccount);
    const dispatch = useDispatch();

    const initLoadingBankAccount = useCallback(async () => {
        setLoading(true);
        await bankAccountServices.index(dispatch);
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        initLoadingBankAccount();
    }, [initLoadingBankAccount]);

    useEffect(() => {
        if(bankAccounts) {
            setBankAccount(bankAccounts);
        }
    },[bankAccounts])

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

                        <div className="row mb-3">
                            <div className="col-12">
                                <AddNewBankAccount />
                            </div>
                        </div>

                        {!loading && (
                            <div className="row mb-3">
                                <div className="col-sm-12">
                                    <Accordion defaultActiveKey="1" className="mt-3">
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header> <b> Bank Account Lists </b> </Accordion.Header>
                                            <Accordion.Body>
                                                <div className="table-responsive">
                                                <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th> Account Holder Name</th>
                                                        <th> Account Number </th>
                                                        <th> Branch </th>
                                                        <th> Address </th>
                                                     </tr>
                                                </thead>

                                                <tbody>
                                                    { bankAccount.map((value, index) => {
                                                        return(
                                                            <tr key={`bank_account_id_${index}`}>
                                                                <td> {value.account_name} </td>    
                                                                <td> {value.account_number} </td>  
                                                                <td> {value.branch} </td>    
                                                                <td> {value.address} </td>                                                   
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                                </div>
                                        </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}