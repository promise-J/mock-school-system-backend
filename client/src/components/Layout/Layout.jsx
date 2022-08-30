import Header from "../header/Header";
import "./layout.css";
import Sidebar from "../sidebar/Sidebar";

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <Sidebar />

        {children}
      </div>
    </div>
    // <div className='dashboard'>
    //     <Header />
    //     <div className="dashboard-body">
    //         {/* <Sidebar /> */}
    //         <div className="dashboardSidebar">

    //         <div className="sidebar-container">
    //         <h1 className='sidebar-heading'>
    //         <Link to='dashboard'>
    //         <AssignmentIcon className='dashboardIcons' />
    //         Dashboard
    //         </Link>
    //         </h1>
    //         <ul className="sidebar-lists">
    //         <li className="sidebar-list">
    //         <div className="sidebar-list-div">
    //         <AccountBalanceIcon />
    //         <span>
    //         STUDENT CLASSES
    //         </span>
    //         {/* <ArrowDropUpIcon className='dropIcon' /> */}
    //         </div>
    //         <ul className='sidebar-inner-list'>
    //         <Link to='/viewClass'>
    //         <li><QueueIcon className='dashboardIcons' /> MANAGE CLASS</li>
    //         </Link>
    //         </ul>
    //         </li>
    //         <li className="sidebar-list">
    //         <div className="sidebar-list-div">
    //         <ListAltIcon />
    //         <span>
    //         SUBJECTS
    //         </span>
    //         </div>
    //         <ul className='sidebar-inner-list'>
    //         <Link to='/viewSubject'>
    //         <li><QueueIcon className='dashboardIcons' /> MANAGE SUBJECT</li>
    //         </Link>
    //         </ul>
    //         </li>
    //         <li className="sidebar-list">
    //         <div className="sidebar-list-div">
    //         <PeopleIcon />
    //         <span>
    //         STUDENTS
    //         </span>
    //         </div>
    //         <ul className='sidebar-inner-list'>
    //         <Link to='/viewStudent'>
    //         <li><QueueIcon className='dashboardIcons' /> MANAGE STUDENTS</li>
    //         </Link>
    //         </ul>
    //         </li>
    //         <li className="sidebar-list">
    //         <div className="sidebar-list-div">
    //         <EqualizerIcon />
    //         <span>
    //         RESULTS
    //         </span>
    //         </div>
    //         <ul className='sidebar-inner-list'>
    //         <Link to='/viewResult'>
    //         <li><QueueIcon className='dashboardIcons' /> MANAGE RESULT</li>
    //         </Link>
    //         </ul>
    //         </li>
    //         <li className="sidebar-list">
    //         <div className="sidebar-list-div">
    //         <EqualizerIcon />
    //         <span>
    //         SESSIONS
    //         </span>
    //         </div>
    //         <ul className='sidebar-inner-list'>
    //         <Link to='/viewSession'>
    //         <li><QueueIcon className='dashboardIcons' /> MANAGE SESSION</li>
    //         </Link>
    //         {/* <li>ONE</li> */}
    //         </ul>
    //         </li>
    //         <li className="sidebar-list">
    //         <div className="sidebar-list-div">
    //         <Link to='/adminPassword'>
    //         <VpnKeyIcon />
    //         <span>
    //         Admin Change Password
    //         </span>
    //         </Link>
    //         </div>
    //         </li>

    //         </ul>
    //         </div>
    //         </div>

    //         <div className="dashboardBody">
    //         {children}
    //         </div>
    //     </div>
    // </div>
  );
}

export default Layout;
