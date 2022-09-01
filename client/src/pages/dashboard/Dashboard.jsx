import React, { useEffect, useState } from "react";
import "./dashboard.css";
import PeopleIcon from "@material-ui/icons/People";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import QueueIcon from "@material-ui/icons/Queue";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import Layout from "../../components/Layout/Layout";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { isPrincipal } from "../../utils/roleChecks";
import { axiosRequest } from "src/utils/axiosRequest";
import Cookie from 'universal-cookie';

// eslint-disable-next-line
function Dashboard() {
  const cookies = new Cookie()
  const { user, role } = useSelector((state) => state.auth);
  const TOKEN = cookies.get('loginID')

  const [stats, setStats] = useState(null);
  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await axiosRequest.get("/stats", {headers: {Authorization: TOKEN}});
        console.log(TOKEN, 'dashboard')
        setStats(res.data.stats);
      } catch (error) {
        console.log(error, 'from the dashboard')
      }
    };
    setTimeout(()=>{
      TOKEN && getClasses();
    },2000)
  }, [TOKEN]);


  return (
    <>
      <Layout>
        {user && stats ? (
          <div className="dashboard">
            <p
              style={{
                textAlign: "right",
                marginRight: "30px",
                textDecoration: "underline",
                marginTop: "10px",
              }}
            >
              {user.user.loginID}
            </p>
            {
              isPrincipal(role) ?
            <div className="dashboardDisplay">
              <Link to="/viewStudent">
                <div className="dashboardItem">
                  <span>
                    <PeopleIcon className="dashboardIcon" />{" "}
                  </span>
                  {stats.studentCount < 1
                    ? "No Student Record"
                    : stats.studentCount + "  Registered Student"}
                </div>
              </Link>
              <Link to="/viewTeachers">
                <div className="dashboardItem">
                  <span>
                    <PeopleIcon className="dashboardIcon" />{" "}
                  </span>
                  {stats.teachesCount < 1
                    ? "No Staff Registered"
                    : stats.teachesCount + "  Working Staff"}
                </div>
              </Link>
              <Link className="link" to="/viewSubject">
                <div className="dashboardItem">
                  <span>
                    <QueueIcon className="dashboardIcon" />{" "}
                  </span>
                  {stats.subjectCount < 1
                    ? "No Subject Entries"
                    : stats.subjectCount + " Offered Subjects"}
                </div>
              </Link>
              <Link className="link" to="/viewResult">
                <div className="dashboardItem">
                  <span>
                    <BorderColorIcon className="dashboardIcon" />{" "}
                  </span>
                  See Approved Results
                </div>
              </Link>
              <Link className="link" to="/viewClass">
                <div className="dashboardItem">
                  <span>
                    <AccountBalanceIcon className="dashboardIcon" />{" "}
                  </span>
                  {stats.classesCount < 1
                    ? "No Class Record"
                    : stats.classesCount + " Classess"}
                </div>
              </Link>
            </div> :
            <div className="dashboardDisplay">
                <Link to="/viewStudent">
                <div className="dashboardItem">
                  <span>
                    <PeopleIcon className="dashboardIcon" />{" "}
                  </span>
                  {stats.studentCount < 1
                    ? "No Student Record"
                    : stats.studentCount + "  Registered Student"}
                </div>
              </Link>
              <Link className="link" to="/viewSubject">
                <div className="dashboardItem">
                  <span>
                    <QueueIcon className="dashboardIcon" />{" "}
                  </span>
                  {stats.subjectCount < 1
                    ? "No Subject Entries"
                    : stats.subjectCount + " Offered Subjects"}
                </div>
              </Link>
              <Link className="link" to="/viewResult">
                <div className="dashboardItem">
                  <span>
                    <BorderColorIcon className="dashboardIcon" />{" "}
                  </span>
                  270 Approved Results
                </div>
              </Link>
              </div>
             }
          </div>
        ) : (
          <Loading />
        )}
      </Layout>
    </>
  );
}

export default Dashboard;
