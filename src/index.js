import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux'
import { routers } from './routes';
import { stores } from './constants/stores';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/style.css";
import { accountServices } from './modules/account/accountServices';
import { getData } from './libs/localstorage';
import { keys } from './constants/config';

const root = ReactDOM.createRoot(document.getElementById('root'));

const InitLoading = () => {
  const dispatch = useDispatch();

  const loadingData = useCallback( async () => {
    if(getData(keys.API_TOKEN)) {
      await accountServices.profile(dispatch);
    }
  },[dispatch]);

  useEffect(() => {
    loadingData()
  },[loadingData]);
}

root.render(
  <Provider store={stores}>
    <InitLoading />
    <RouterProvider router={routers} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
