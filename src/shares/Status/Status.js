import { useEffect, useState } from 'react';
import { statusOptions } from '../../constants/config';
import "./status.css";

export const Status = ({ status }) => {

    const [dataSource, setDataSource] = useState(null);

    useEffect(() => {
        if(status) {
            const getStatus = statusOptions.filter(value => value.status === status)[0];
            setDataSource(getStatus);
        }
    },[status]);

    return(
        <>
            { dataSource && (
                <span className={`badge ${dataSource.color}`}>
                    {dataSource.status}
                </span>
            )}  
        </>
    )
}