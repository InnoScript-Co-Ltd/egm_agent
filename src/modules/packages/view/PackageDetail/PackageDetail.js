import { useCallback, useEffect, useState } from "react"
import { Header } from "../../../../shares/Header"
import { Notification } from "../../../../shares/Notification"
import { SideMenu } from "../../../../shares/SideMenu"
import { useDispatch, useSelector } from "react-redux"
import { packageServices } from "../../packageServices"
import { useParams } from "react-router-dom"

export const PackageDetail = () => {

    const [loading, setLoading] = useState(false);
    const { packageDetail } = useSelector(state => state.package);

    const dispatch = useDispatch();
    const params = useParams();

    const initLoading = useCallback(async () => {
        setLoading(false);
        const result = await packageServices.show(dispatch, params.id);
        
        if(result.status === 200) {

        }
        
        setLoading(true);
    },[dispatch, params.id]);

    useEffect(() => {
        initLoading();
    },[initLoading]);

    return(
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-2 col-lg-2">
                        <SideMenu />
                    </div>

                    <Notification />

                    <div className="col-sm-12 col-md-10 col-lg-10 mt-3">
                        {!loading && packageDetail && (
                            <div className="card" style={{ background: "#212529", color: "#fff" }}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 col-md-6 col-lg-6">
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