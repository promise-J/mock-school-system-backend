import { 
    Class,
    Feedback,
    Healing,
    Home, 
    PersonAdd, 
    Subject,
}
 from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { isPrincipal } from '../../utils/roleChecks'
import './sidebar.css'



const Sidebar = ({student}) => {
    const { user, role } = useSelector((state) => state.auth);
    const loca = useLocation()

    const [location, setLocation] = useState('')

    useEffect(()=>{
      setLocation(loca.pathname.split('/')[1])
    },[loca.pathname])

    return (
      <div className="sidebar">
        <div className="sidebarWrapper">
          {/* <h1 className='sidebarTitle'>{user?.user?.loginID}. </h1> */}
          {user?.role !== "student" && (
            <div title={user?.user?.loginID} className="profile">
              {user?.user?.loginID[0]}
            </div>
          )}
          {user.role !== "student" ? (
            <ul className="sidebarList">
              <Link to="/dashboard" className="link">
                <li
                  className={
                    location === "dashboard"
                      ? "sidebarListItem active"
                      : "sidebarListItem"
                  }
                >
                  <Home className="sidebarListItemIcon" /> Dashboard
                </li>
              </Link>
              <Link to="/viewClass" className="link">
                <li
                  className={
                    location === "viewClass"
                      ? "sidebarListItem active"
                      : "sidebarListItem"
                  }
                >
                  <Class className="sidebarListItemIcon" /> Manage Classes
                </li>
              </Link>
              <Link to="/viewStudent" className="link">
                <li
                  className={
                    location === "viewStudent"
                      ? "sidebarListItem active"
                      : "sidebarListItem"
                  }
                >
                  <PersonAdd className="sidebarListItemIcon" /> Manage Students
                </li>
              </Link>
              <Link to="/viewResult" className="link">
                <li
                  className={
                    location === "viewResult"
                      ? "sidebarListItem active"
                      : "sidebarListItem"
                  }
                >
                  <Feedback className="sidebarListItemIcon" /> Manage Results
                </li>
              </Link>
              <Link to="/createQuestion" className="link">
                <li
                  className={
                    location === "createQuestion"
                      ? "sidebarListItem active"
                      : "sidebarListItem"
                  }
                >
                  <Home className="sidebarListItemIcon" /> Create Question
                </li>
              </Link>
              {isPrincipal(role) && (
                <>
                  <Link to="/viewSubject" className="link">
                    <li
                      className={
                        location === "viewSubject"
                          ? "sidebarListItem active"
                          : "sidebarListItem"
                      }
                    >
                      <Subject className="sidebarListItemIcon" /> Manage
                      Subjects
                    </li>
                  </Link>
                  <Link to="/viewTeachers" className="link">
                    <li
                      className={
                        location === "viewTeachers"
                          ? "sidebarListItem active"
                          : "sidebarListItem"
                      }
                    >
                      <Healing className="sidebarListItemIcon" /> Manage
                      Teachers
                    </li>
                  </Link>
                  <Link to="/adminPassword" className="link">
                    <li
                      className={
                        location === "adminPassword"
                          ? "sidebarListItem active"
                          : "sidebarListItem"
                      }
                    >
                      <Healing className="sidebarListItemIcon" /> Subscription
                    </li>
                  </Link>
                  <Link to="/viewScratch" className="link">
                    <li
                      className={
                        location === "viewScratch"
                          ? "sidebarListItem active"
                          : "sidebarListItem"
                      }
                    >
                      <Healing className="sidebarListItemIcon" /> View Scratch
                      Card
                    </li>
                  </Link>
                  <Link to="/viewSession" className="link">
                    <li
                      className={
                        location === "viewSession"
                          ? "sidebarListItem active"
                          : "sidebarListItem"
                      }
                    >
                      <Home className="sidebarListItemIcon" /> Manage Sessions
                    </li>
                  </Link>
                  <Link to="/staffMessage" className="link">
                    <li
                      className={
                        location === "staffMessage"
                          ? "sidebarListItem active"
                          : "sidebarListItem"
                      }
                    >
                      <Home className="sidebarListItemIcon" /> Messages
                    </li>
                  </Link>
                </>
              )}
            </ul>
          ) : (
            <ul className="sidebarList">
              <Link to="/student-dashboard" className="link">
                <li
                  className={
                    location === "student-dashboard"
                      ? "sidebarListItem active"
                      : "sidebarListItem"
                  }
                >
                  <Home className="sidebarListItemIcon" /> Dashboard
                </li>
              </Link>
              <Link to="/student-exam" className="link">
                <li
                  className={
                    location === "student-exam"
                      ? "sidebarListItem active"
                      : "sidebarListItem"
                  }
                >
                  <Home className="sidebarListItemIcon" /> Exams
                </li>
              </Link>
              <Link to="/student-result" className="link">
                <li
                  className={
                    location === "student-result"
                      ? "sidebarListItem active"
                      : "sidebarListItem"
                  }
                >
                  <Home className="sidebarListItemIcon" /> Result
                </li>
              </Link>
            </ul>
          )}
        </div>
      </div>
    );
}

export default Sidebar
