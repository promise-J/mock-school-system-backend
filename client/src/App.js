import { useEffect } from "react";

import Homepage from "./pages/homepage/Homepage";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import StudentLogin from "./pages/studentLogin/ResultCheckPage";
import ClassView from "./pages/class/ClassView";
import CreateSubjectPage from "./pages/subject/CreateSubjectPage";
import ViewSubjectPage from "./pages/subject/ViewSubjectPage";
import ViewStudentPage from "./pages/student/ViewStudentPage";
import CreateStudentPage from "./pages/student/CreateStudentPage";
import ViewSessionPage from "./pages/session/ViewSessionPage";
import CreateSessionPage from "./pages/session/CreateSessionPage";
import ViewResultPage from "./pages/result/ViewResultPage";
import CreateResultPage from "./pages/result/CreateResultPage";
import Aos from "aos";
import "aos/dist/aos.css";
// import Class from './pages/class/ClassCreate';
import { useDispatch, useSelector } from "react-redux";

import {
  dispatchLogin,
  dispatchUser,
  fetchUser,
} from "./redux/actions/authAction";
import SingleResult from "./pages/singleResult/SingleResult";
import ClassCreate from "./pages/class/ClassCreate";
import ClassEdit from "./pages/class/ClassEdit";
import ResultTemplate from "./components/resultTemplate/ResultTemplate";
import ResultCheck from "./components/resultCheck/ResultCheck";
import Enquiry from "./components/enquiry/Enquiry";
import Club from "./components/clubs/Club";
import Prefect from "./components/clubs/prefects/Prefect";
import Welcome from "./components/welcome/Welcome";
import AdminPassword from "./pages/adminPassword/AdminPassword";

import Teachers from "./pages/teachers/Teachers";
import StaffMessage from "./pages/staffMessage/StaffMessage";
import NotFound from "./pages/NotFound/NotFound";
import {
  AdminRoute,
  PrincipalRoute,
  StudentRoute,
} from "./components/AuthRoutes";
import { useState } from "react";
import ForgotPassword from "./components/passwordReset/ForgotPassword";
import ResetPassword from "./components/passwordReset/ResetPassword";
import ViewScratchCard from "./pages/scratchCard/ViewScratchCard";
import RequestCard from "./pages/scratchCard/RequestCard";
import Notifications from "./components/notifications";

// import Loading from "./components/loading/Loading";

function App() {
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(true);
  const {REACT_APP_CLIENT_URL} = process.env;
  const PF = REACT_APP_CLIENT_URL;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    Aos.init({
      duration: 1000,
      offset: 10,
      delay: 50,
      easing: "ease-in-sine",
      // disable: "mobile",
      once: true
    });
  }, []);

  const { user, isLogged } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user && isLogged) {
      const getUser = async () => {
        dispatch(dispatchLogin());
        return fetchUser().then((user) => {
          dispatch(dispatchUser(user));
          setFetching(false);
        });
      };
      getUser();
    } else {
      setFetching(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (fetching) {
    // Give something like appLoading spinner which will be different from the normal spinner
    return (
      <div className="App">
        {/* <Loading /> */}
        <img
          className="image-loader"
          src={PF + "/images/solu.jpg"}
          alt="solution page"
        />
      </div>
    );
  }

  // The order of these routes is critical! Be careful with it
  return (
    <div className="App">
      <Notifications />
      <Switch>
        <Route component={Homepage} path="/" exact />
        <Route component={Enquiry} path="/enquiry" exact />
        <Route component={Club} path="/clubs" exact />
        <Route component={Prefect} path="/prefects" exact />
        <Route component={Welcome} path="/welcome" exact />
        <Route component={StudentLogin} path="/resultSearch" exact />
        <Route component={Login} path="/login" exact />
        <Route component={ForgotPassword} path="/forgotPassword" exact />
        <Route component={ResetPassword} path="/user/reset/:token" exact />

        {/* Student Routes */}

        <StudentRoute component={ResultTemplate} path="/studentResult" exact />
        <StudentRoute component={ResultCheck} path="/resultCheck/" exact />
        {/* Admin Routes */}

        <AdminRoute path="/dashboard" component={Dashboard} />
        <AdminRoute path="/staffMessage" component={StaffMessage} />
        <AdminRoute path="/viewClass" component={ClassView} />
        <AdminRoute path="/viewResult/:resultID" component={SingleResult} />
        <AdminRoute path="/viewResult" component={ViewResultPage} />
        <AdminRoute path="/createResult" component={CreateResultPage} />
        <AdminRoute
          path="/createUser/:studentID"
          component={CreateStudentPage}
        />
        <AdminRoute path="/createUser" component={CreateStudentPage} />
        <AdminRoute path="/viewStudent" component={ViewStudentPage} />

        {/* Principal Only Routes */}

        <PrincipalRoute path="/adminPassword" component={AdminPassword} />
        <PrincipalRoute path="/viewTeachers" component={Teachers} />
        <PrincipalRoute path="/editClass/:classID" component={ClassEdit} />
        <PrincipalRoute path="/createClass" component={ClassCreate} />
        <PrincipalRoute
          path="/createSubject/:subjectID"
          component={CreateSubjectPage}
        />
        <PrincipalRoute path="/createSubject" component={CreateSubjectPage} />
        <PrincipalRoute path="/viewSubject" component={ViewSubjectPage} />
        <PrincipalRoute path="/viewSession" component={ViewSessionPage} />
        <PrincipalRoute
          path="/createSession/:sessionID"
          component={CreateSessionPage}
        />
        <PrincipalRoute path="/createSession" component={CreateSessionPage} />
        <PrincipalRoute path="/viewScratch" component={ViewScratchCard} />
        <PrincipalRoute path="/requestCard" component={RequestCard} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
