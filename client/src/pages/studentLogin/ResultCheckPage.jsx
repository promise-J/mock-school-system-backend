import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./studentLogin.css";
import { SearchOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { dispatchLogin, dispatchUser } from "../../redux/actions/authAction";
import { axiosRequest } from "src/utils/axiosRequest";
import { useNotify } from "src/customHooks";

function StudentLogin() {
  const notify = useNotify()
  // const {isLogged} = useSelector(state=> state.auth)
  const history = useHistory();
  const dispatch = useDispatch();
  const initialState = {
    session: "",
    term: "",
    loginID: "",
    scard: "",
    error: "",
    success: "",
  };

  const [data, setData] = useState(initialState);
  const [allSessions, setAllSessions] = useState([]);
  const { session, loginID, term, scard } = data;

  useEffect(() => {
    const getSessions = async () => {
      const res = await axiosRequest.get("/session/all/session");

      setAllSessions(res.data.sessions);
    };
    getSessions();
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if(!session || !term || !loginID || !scard){
    //     setData({...data, error: 'Please Enter All Fields'})
    // }

    // return console.log({session, term, scard, loginID})

    const getResult = async () => {
      try {
        const res = await axiosRequest.post(`/result/authenticate`, {
          session,
          user: loginID,
          term,
          card: scard,
        });
        const { user } = res.data;

        dispatch(dispatchLogin());
        dispatch(dispatchUser(user));
        history.push({
          pathname: `/resultCheck`,
          state: res.data,
        });
        notify('success', 'Redirecting! Please wait...')
      } catch (error) {
        notify('error', error?.response?.data)
      }
    };
    getResult();
  };

  return (
    <div className="studentLogin">
      <Header />
      <div className="divide"></div>
      <div className="studentLoginContainer">
        <form onSubmit={handleSubmit}>
          <img
            className="studentLoginLogo"
            src="https://media.istockphoto.com/vectors/education-symbol-design-template-pencil-and-book-icon-stylized-vector-id1171617683?k=20&m=1171617683&s=612x612&w=0&h=E2wEAH0mQ2j-MT_i0sHj_6OUWoJKlD-3Pt7_Y8WhzD0="
            alt=""
          />
          <h1>Student's Result Portal</h1>
          <p>Search Result here</p>
          <h3>What is Your Student Registration Number ?</h3>
          <div className="studentLoginInputDiv">
            <input
              value={data.loginID}
              name="loginID"
              placeholder="Enter Your Reg number"
              onChange={handleChange}
            />
          </div>
          <div className="studentLoginInputDiv">
            <input
              value={data.scard}
              name="scard"
              placeholder="Enter Scratch Card here"
              onChange={handleChange}
            />
          </div>
          <div className="studentLoginInputDiv">
            {/* <input placeholder='Enter Session' /> */}
            <select name="session" value={session} onChange={handleChange}>
              <option value="">Choose a Session</option>
              {allSessions.map((session) => (
                <option key={session._id} value={session._id}>
                  {session.year}
                </option>
              ))}
            </select>
          </div>
          <div className="studentLoginInputDiv">
            {/* <input placeholder='Enter Term' /> */}
            <select name="term" value={term} onChange={handleChange}>
              <option value="">Choose a Term</option>
              <option value="first">First</option>
              <option value="second">Second</option>
              <option value="third">Third</option>
            </select>
          </div>
          <button>
            Search Result
            <SearchOutlined className="studentLoginSearchIcon" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;
