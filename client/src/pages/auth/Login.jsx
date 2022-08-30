import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Header from "../../components/header/Header";
import TelegramIcon from "@material-ui/icons/Telegram";
import { useDispatch } from "react-redux";
// import axios from "axios";
import "./auth.css";
import { dispatchLogin, dispatchUser } from "../../redux/actions/authAction";
import styled from "styled-components";
import { Check, Clear } from "@material-ui/icons";
import {useNotify} from '../../customHooks'
import Cookie from 'universal-cookie'
// import { axiosRequest } from "src/utils/axiosRequest";
import axios from "axios";

const InputSpan = styled.span`
  font-size: 12px;
  color: ${(props) => props.color};
  margin-top: 5px;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  letter-spacing: 3px;
  margin-left: auto;
  transition: 1s all ease;
`;

const {REACT_APP_CLIENT_URL} = process.env

function Login() {
  const cookies = new Cookie()
  const history = useHistory()
  const dispatch = useDispatch();
  const notify = useNotify()
  const PF = REACT_APP_CLIENT_URL

  const initialState = {
    loginID: "",
    password: "",
  };

  const [data, setData] = useState(initialState);
  const { loginID, password } = data;
  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };
  
  const adminLogin = async(e)=>{
    e.preventDefault()
    try {
      const res = await axios.post('/users/login', {loginID: 'admin', password: 'superadmin'})   
      cookies.set('loginID', res.data.token)
      dispatch(dispatchLogin());
      dispatch(dispatchUser(res.data.user));
      notify("success", "Login Successful");
      history.push("/dashboard");
    } catch (error) {
      console.log(error, 'from here')
      notify("error", "Login Failed");
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("/users/login", { loginID, password });
      // cookies.set('loginID', res.data.token)
      dispatch(dispatchLogin());
      dispatch(dispatchUser(res.data.user));
      notify('success', 'Login Successful')
      history.push("/dashboard");
    } catch (error) {
      console.log(error)
      notify('error', 'Login Failed')
    }
  };

  const emailMatch = (e) => {
    // return String(e).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return e.length > 4;
  };

  return (
    <div className="login">
      <Header />
      <div className="login-body">
        <div className="logo-sec">
          <h2>DE Resonance Academy</h2>
          <img
            className="login-img"
            src={PF + '/images/solu.jpg'}
            alt=""
          />
          <Link to="/resultSearch" className="student-link">
            <p>
              Click here to view Your result
              <TelegramIcon />
            </p>
          </Link>
        </div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h1>ADMIN ONLY</h1>
            <div className="login-div">
              <input
                onChange={handleChange}
                name="loginID"
                placeholder="Enter LoginID here"
              />
              {emailMatch(loginID) ? (
                <InputSpan
                  style={{ display: !loginID && "none" }}
                  color="#00ff00"
                >
                  Verification Confirmed <Check style={{ fontSize: "13px" }} />
                </InputSpan>
              ) : (
                <InputSpan style={{ display: !loginID && "none" }} color="red">
                  loginID Verification Failed{" "}
                  <Clear style={{ fontSize: "13px" }} />
                </InputSpan>
              )}
            </div>
            <div className="login-div">
              <input
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Enter Password here"
              />
            </div>
            <div className="login-div btn-group">
              <button disabled={!emailMatch(loginID)} className="login-button">
                Login
              </button>
              <button onClick={adminLogin} className="login-button">
                Guest Admin
              </button>
            </div>
            <Link className='login-forgot' to='/forgotPassword'>Forgot Password? Click Here</Link>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Login;
