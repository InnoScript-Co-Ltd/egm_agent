import Button from "react-bootstrap/esm/Button";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import { AlertMessage } from "../../../shares/AlertMessage"
import { useDispatch, useSelector } from "react-redux"
import { Header } from "../../../shares/Header"
import { SideMenu } from "../../../shares/SideMenu"
import { useCallback, useEffect, useState } from "react";
import { channelServices } from "../channelServices";
import { paths } from "../../../constants/paths";
import { useNavigate } from "react-router-dom";
import { CreateChannel } from "../entry/CreateChannel";
import { Notification } from "../../../shares/Notification";
import numeral from "numeral";

export const ChannelList = () => {
    const { user } = useSelector(state => state.account);
    const { channels } = useSelector(state => state.channel);

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadingInitChannel = useCallback(async () => {
        setLoading(true);
        await channelServices.index(dispatch);
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        loadingInitChannel();
    }, [loadingInitChannel]);

    useEffect(() => {
        if (user && user.agent_type !== "MAIN_AGENT") {
            navigate(paths.dashboard);
        }
    }, [user, navigate]);

    return (
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
                                {!loading && <CreateChannel />}

                                <div className="row mt-3">
                                    {channels && channels.map((value, index) => {
                                        return (
                                            <div key={`channel_id_${index}`} className="col-3 mb-3">
                                                <div className="card card-hover" onClick={() => navigate(`${paths.channel}/${value.id}`)}>
                                                    <div className="card-title">
                                                        <div className="channel-header">
                                                            <div className="channel-side">
                                                                <span> {value.name} </span>
                                                                <span> ROI - {numeral(100000).format("0,0")} Kyats </span>
                                                            </div>
                                                            <Badge> {value.agent_in_channel.length} Agents </Badge>
                                                        </div>
                                                    </div>

                                                    <div className="card-body">
                                                        <span className="investor-count"> 0 Investor </span>
                                                    </div>

                                                    <div className="card-footer channel-card-footer">
                                                        <span> IA - {numeral(10000).format('0,0')} Kyats </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}