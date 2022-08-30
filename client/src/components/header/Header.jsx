import { Close, MenuOpen } from "@material-ui/icons";
// import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { axiosRequest } from "src/utils/axiosRequest";
import { dispatchLogout } from "../../redux/actions/authAction";
import "./header.css";
const { REACT_APP_CLIENT_URL } = process.env;

function Header() {
  const { isLogged } = useSelector((state) => state.auth);
  const [toggle, setToggle] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const PF = REACT_APP_CLIENT_URL;

  const handleMenu = () => {
    setToggle((state) => !state);
  };

  const handleMenuLogout = async () => {
    setToggle((state) => !state);
    try {
      await axiosRequest.get("/users/logout");
      // localStorage.removeItem("firstLogin");
      dispatch(dispatchLogout());
      history.push("/");
    } catch (error) {
      dispatch(dispatchLogout());
      history.push("/");
    }
  };

  const logout = async () => {
    try {
      await axiosRequest.get("/users/logout");
      localStorage.removeItem("firstLogin");
      dispatch(dispatchLogout());
      history.push("/");
    } catch (error) {
      dispatch(dispatchLogout());
      history.push("/");
    }
  };

  return (
    <>
      <header className="header">
        <div
          className="menuPlane"
          style={{ transform: toggle ? "translateX(0%)" : "translateX(-120%)" }}
        >
          {/* <span onClick={handleMenu} className='closeMenu'>X</span> */}
          {isLogged ? (
            <>
              {" "}
              <h2>Dashboard</h2>
              <ul>
                <Link onClick={handleMenu} to="/viewClass">
                  <li>Manage Classes</li>
                </Link>
                <Link onClick={handleMenu} to="/viewStudent">
                  <li>Manage Students</li>
                </Link>
                <Link onClick={handleMenu} to="/viewSubject">
                  <li>Manage Subjects</li>
                </Link>
                <Link onClick={handleMenu} to="/viewTeachers">
                  <li>Manage Teachers</li>
                </Link>
                <Link onClick={handleMenu} to="/viewResult">
                  <li>Manage Results</li>
                </Link>
                <Link onClick={handleMenu} to="/viewSession">
                  <li>Manage Sessions</li>
                </Link>
                <Link onClick={handleMenu} to="/adminPassword">
                  <li>App Admin Settings</li>
                </Link>
                <Link onClick={handleMenu} to="/staffMessage">
                  <li>Messages</li>
                </Link>
                <li style={{ cursor: "pointer" }} onClick={handleMenuLogout}>
                  Logout
                </li>
              </ul>
            </>
          ) : (
            <>
              <h2>Resonance Academy</h2>
              <ul>
                <Link className="link" onClick={handleMenu} to="/">
                  <li>Home</li>
                </Link>
                <Link onClick={handleMenu} to="/clubs">
                  <li>Gallery</li>
                </Link>
                <Link onClick={handleMenu} to="/enquire">
                  <li>Contact</li>
                </Link>
                <Link onClick={handleMenu} to="/">
                  <li>News</li>
                </Link>
                <Link onClick={handleMenu} to="/">
                  <li>About</li>
                </Link>
                <Link className="link" onClick={handleMenu} to="/login">
                  <li>Portal</li>
                </Link>
              </ul>
            </>
          )}
        </div>
        {isLogged ? (
          <div className="header-link">
            <Link className="link" to="/viewClass">
              Classes
            </Link>
            <Link className="link" to="/viewResult">
              Results
            </Link>
            <Link className="link" to="/viewStudent">
              Students
            </Link>
          </div>
        ) : (
          <div className="header-link">
            <Link className="link" to="/">
              Home
            </Link>
            <Link className="link" to="/clubs">
              About
            </Link>
            <Link className="link" to="/clubs">
              News
            </Link>
            <Link className="link" to="/clubs">
              Gallery
            </Link>
            <Link className="link" to="/enquiry">
              Contact
            </Link>
          </div>
        )}
        <div className="logo">
          <img
            src={PF + "/images/solu.jpg"}
            alt="logo"
            style={{ height: 32, width: 32 }}
          />
          {isLogged ? (
            <button onClick={logout} className="link" style={{background: 'inherit'}}>
              Logout
            </button>
          ) : (
            <Link
              className="link"
              to={isLogged ? "/dashboard" : "/login"}
            >
              Portal
            </Link>
          )}
        <div className="headerMenu">
          {!toggle ? (
            <MenuOpen onClick={handleMenu} />
          ) : (
            <Close onClick={handleMenu} />
          )}
        </div>
        </div>
      </header>
      <div className="divide-header"></div>
    </>
  );
}

export default Header;
