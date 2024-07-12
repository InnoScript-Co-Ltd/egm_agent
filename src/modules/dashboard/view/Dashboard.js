import { useSelector } from "react-redux"
import { Header } from "../../../shares/Header";
import { AlertMessage } from "../../../shares/AlertMessage";
import { SideMenu } from "../../../shares/SideMenu";

export const Dashboard = () => {
    const { user } = useSelector(state => state.account);

    if (user) {
        console.log(user);
    }
    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-2 col-lg-2">
                        <SideMenu />
                    </div>

                    <div className="col-sm-12 col-md-10 col-lg-10">
                        <AlertMessage />
                    </div>
                </div>
            </div>
        </>
    )
}