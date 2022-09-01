import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import DataProvider, { store } from "./redux/store";
import axios from "axios";
import { dispatchLogout } from "./redux/actions/authAction";
import Cookies from "universal-cookie";

const cookies = new Cookies()

const token = cookies.get('loginID')
axios.defaults.baseURL = "https://9e6e-129-205-124-145.eu.ngrok.io/";
if(token){
  axios.defaults.withCredentials = true;
}

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const errMsg = error.response?.data?.msg;
    const errStatus = error.response?.status;

    if (errMsg) {
      if (errStatus === 400 && errMsg && errMsg.includes("Authorization")) {
        store.dispatch(dispatchLogout());
      }
    }

    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  function (config) {
    if(token){
      config.headers.Authorization = token
      console.log(token, 'there is token from the interceptor')
    }
    return config
  },
  function(error){
    return Promise.reject(error)
  }
);

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <Router>
        <App />
      </Router>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
