import Alert from 'react-bootstrap/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { updateNotification } from '../constants/shareSlice';
import { useCallback, useEffect } from 'react';

export const Notification = () => {

    const { notification } = useSelector(state => state.share);

    const dispatch = useDispatch();

    const onCloseHandler = useCallback(async () => {
        dispatch(updateNotification(
            {
                show: false,
            },
        ))
    }, [dispatch]);

    return (
        <div className='notification-wrapper'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='d-flex flex-row justify-content-end align-items-end'>
                        <div className='col-12 col-md-3 col-lg-3'>
                            {notification && notification.show && (
                                <Alert variant={notification.severity} onClose={() => onCloseHandler()} dismissible>
                                    <p> {notification.detail} </p>
                                </Alert>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}