import { useDispatch, useSelector } from "react-redux"
import { AlertMessage } from "../../../shares/AlertMessage"
import { Header } from "../../../shares/Header"
import { Notification } from "../../../shares/Notification"
import { SideMenu } from "../../../shares/SideMenu"
import { useCallback, useEffect, useState } from "react"
import { UpdateChannel } from "../entry/UpdateChannel"
import { channelServices } from "../channelServices"
import { useParams } from "react-router-dom"

export const ChannelDetail = () => {
    const { user } = useSelector(state => state.account);
    const { channel } = useSelector(state => state.channel);
    const [edit, setEdit] = useState(false);

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const params = useParams();

    const loadingInit = useCallback(async () => {
        setLoading(true);
        await channelServices.show(dispatch, params.id);
        setLoading(false);
    },[dispatch, params.id]);

    useEffect(() => {
        loadingInit();
    },[loadingInit]);

    useEffect(() => {
        if(channel && channel.agent_in_channel.length > 0) {
            setEdit(false);
        } else {
            setEdit(true);
        }

    },[channel]);

    return(
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-2 col-lg-2">
                        <SideMenu />
                    </div>

                    <Notification />

                    <div className="col-sm-12 col-md-10 col-lg-10">
                        <div className="row mt-3">
                            <AlertMessage />
                        </div>

                        {user && user.kyc_status === 'FULL_KYC' && user.status === 'ACTIVE' && user.agent_type === 'MAIN_AGENT' && (
                            <>
                                {!loading && edit === true && <UpdateChannel />}

                                <div className="row mt-3">
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}