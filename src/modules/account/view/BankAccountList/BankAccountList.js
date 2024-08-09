import { useCallback, useEffect, useState } from "react"
import { accountServices } from "../../accountServices";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRightSquare, CreditCard, Trash2Fill, ViewList } from "react-bootstrap-icons";
import "./bank-account-list.css";
import { DeleteModal } from "../../../../shares/DeleteModal/DeleteModal";

export const BankAccountList = () => {
    const [loading, setLoading] = useState(false);
    const [showDelModal, setShowDelModal] = useState(false);
    const [selectBankAccount, setBankAccount] = useState(null);

    const { bankAccounts } = useSelector(state => state.account);

    const dispatch = useDispatch();

    const delBankAccount = async () => {
        setLoading(true);
        const result = await accountServices.delBankAccount(selectBankAccount.id, dispatch);

        if(result.status === 200) {
            await accountServices.bankAccountIndex(dispatch);
        }

        setLoading(false);
    }

    const initLoading = useCallback(async () => {
        setLoading(true);
        await accountServices.bankAccountIndex(dispatch);
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        initLoading();
    }, [initLoading]);

    return (
        <div className="row">
            <div className="col-12 mt-3">
                <div className="table-responsive">
                    <table className="table table-sm table-dark">
                        <thead>
                            <tr className="agent-list-table-title">
                                <th scope="col"> # </th>
                                <th scope="col"> Account Name </th>
                                <th scope="col"> Account Number </th>
                                <th scope="col"> Bank Type </th>
                                <th scope="col"> Branch </th>
                                <th scope="col"> Branch Address </th>
                                <th scope="col"> Option </th>
                            </tr>
                        </thead>

                        <tbody className="agent-list-table-row">
                            {loading === false && bankAccounts && bankAccounts.map((value, index) => {
                                return (
                                    <tr key={`bank_account_id_${index}`}>
                                        <td style={{ width: "50px" }}> {index + 1} </td>
                                        <td style={{ width: "300px" }}> {value.account_name} </td>
                                        <td style={{ width: "300px" }}> <CreditCard /> {value.account_number} </td>
                                        <th style={{ width: "300px" }}> {value.bank_type} </th>
                                        <td style={{ width: "300px" }}> {value.branch} </td>
                                        <td style={{ width: "300px" }}> {value.branch_address} </td>
                                        <td style={{ width: "300px" }}>
                                            <ArrowRightSquare className="option-icon" size={16} />
                                            <Trash2Fill 
                                                className="option-icon" 
                                                size={16} 
                                                onClick={() => {
                                                    setShowDelModal(!showDelModal);
                                                    setBankAccount(value);
                                                }} 
                                                />
                                            <ViewList className="option-icon" size={16} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <DeleteModal 
                title="Delete Bank Account"
                body="Are you sure to delete this bank account record?"
                show={showDelModal}
                onClose={(e) => {
                    setShowDelModal(e);
                }}
                delAction={(e) => {
                    if(e === true) {
                        delBankAccount()
                    }
                }}
            />
        </div>
    )
}