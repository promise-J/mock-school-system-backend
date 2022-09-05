import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { isStudent as studentRole, isPrincipal } from "../../utils/roleChecks";
import Loading from "../loading/Loading";
import {useNotify} from '../../customHooks'

function CreateStudent(props) {
  const { role: userRole } = useSelector((state) => state.auth);
  const { studentID } = useParams();
  const history = useHistory();
  const notify = useNotify()

  const initialState = {
    firstName: "",
    lastName: "",
    middleName: "",
    loginID: "",
    DOB: "",
    role: "",
    classId: "",
    phoneNumber: "",
    password: "",
    error: "",
  };

  const editState = {
    eFirstName: "",
    eLastName: "",
    eMiddleName: "",
    eLoginID: "",
    eDOB: "",
    eRole: "",
    eUserClass: "",
    ePassword: "",
    ePhoneNumber: "",
  };

  const [data, setData] = useState(initialState);
  const [editData, setEditData] = useState(editState);
  // const [editError, setEditError] = useState('')
  // const [editData, setEditData] = useState(editState)
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    firstName,
    lastName,
    middleName,
    loginID,
    DOB,
    role,
    classId,
    phoneNumber,
    password,
    error,
  } = data;
  const {
    eFirstName,
    eLastName,
    eMiddleName,
    eLoginID,
    eDOB,
    eRole,
    ePhoneNumber,
    eUserClass,
    ePassword,
  } = editData;
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const { data } = await axios.get(`/users/${studentID}`);
      setEditData({
        eFirstName: data?.firstName,
        eLastName: data?.lastName,
        eMiddleName: data?.middleName,
        eLoginID: data?.loginID,
        eUserClass: data?.class?._id,
        eDOB: data?.DOB,
        eRole: data?.role,
        ePhoneNumber: data?.phoneNumber,
        ePassword: data?.password,
      });
      setLoading(false);
    };
    if (studentID) {
      getUser();
    }
  }, [studentID]);

  useEffect(() => {
    const getClasses = async () => {
      const res = await axios.get("/class");
      setClasses(res.data.classes);
    };
    getClasses();
  }, []);

  useEffect(() => {
    if (role === "student") {
      setIsStudent(true);
    } else {
      setIsStudent(false);
    }
  }, [role, isStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role || !middleName || !firstName || !lastName) {
      return notify('error', 'Fields must be filled')
    }
    if (studentRole(role)) {
      const resetBase = () => {
        setData({ ...data, loginID: "", password: "" });
      };
      resetBase();
    }

    try {
      await axios.post("/users", {
        loginID,
        phoneNumber,
        password,
        role,
        DOB,
        class: classId,
        lastName,
        firstName,
        middleName,
      });
      notify('success', 'Registration successful')
      studentRole(role)
        ? history.push("/viewStudent")
        : history.push("/viewTeachers");
    } catch (error) {
      error?.response?.data &&
        notify('error', 'Something went wrong')
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    // if(studentID && eRole==='student'){
    //   setEditData({...editData, eLoginID: '', ePassword: ''})
    // }
    try {
      await axios.put(`/users/${studentID}`, {
        phoneNumber: ePhoneNumber,
        firstName: eFirstName,
        lastName: eLastName,
        middleName: eMiddleName,
        loginID: eLoginID,
        role: eRole,
        DOB: eDOB,
        class: eUserClass,
        password: ePassword,
      });
      // setEditSuccess("Edit successful");
      // setTimeout(() => {
      //   // setEditData({...editData})
      //   setSuccess("");
      // }, 3000);
      notify('success', 'Edit Successful')
      studentRole(eRole)
        ? history.push("/viewStudent")
        : history.push("/viewTeachers");
    } catch (error) {
      // error.response.data && setData({...data, error: error.response.data, success: ''})
      console.log(error);
      error?.response?.data && notify('error', error?.response?.data)
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
    // if(role==='student' && name==='role'){
    //   const resetBase = ()=>{
    //     setData({...data, loginID: '', password: ''})
    //     if(studentID){
    //       setEditData({...editData, eLoginID: '', ePassword: ''})
    //     }
    //   }
    //   return resetBase()
    // }
  };

  return loading ? (
    <h1 className="loading-text">
      <Loading />
    </h1>
  ) : (
    <div className="dashboard">
      {/* <h1 className='dashboardBodyHeading'>Create Student</h1> */}
      <form
        onSubmit={!studentID ? handleSubmit : handleEditSubmit}
        className="createClassForm"
      >
        <h2>Create User</h2>
        {/* {success && <div className="suc-msg">{success}</div>} */}
        {/* {editSuccess && <div className="suc-msg">{editSuccess}</div>} */}
        {error && <div className="err-msg">{error}</div>}
        <div className="createClassDiv">
          <input
            onChange={
              !studentID
                ? handleChange
                : (e) =>
                    setEditData({ ...editData, eFirstName: e.target.value })
            }
            name="firstName"
            value={!studentID ? firstName : eFirstName}
            placeholder="Enter User's First name"
          />
        </div>
        <div className="createClassDiv">
          <input
            onChange={
              !studentID
                ? handleChange
                : (e) =>
                    setEditData({ ...editData, eMiddleName: e.target.value })
            }
            name="middleName"
            value={!studentID ? middleName : eMiddleName}
            placeholder="Enter User's Middle name"
          />
        </div>
        <div className="createClassDiv">
          <input
            onChange={
              !studentID
                ? handleChange
                : (e) => setEditData({ ...editData, eLastName: e.target.value })
            }
            name="lastName"
            value={!studentID ? lastName : eLastName}
            placeholder="Enter User's Last name"
          />
        </div>
        <div className="createClassDiv">
          <select
            onChange={
              !studentID
                ? handleChange
                : (e) => setEditData({ ...editData, eRole: e.target.value })
            }
            value={!studentID ? role : eRole}
            name="role"
          >
            <option value="">Select Role</option>
            {isPrincipal(userRole) && <option value="teacher">Teacher</option>}
            <option value="student">Student</option>
          </select>
          {/* : <input type="text" value={eRole} disabled={studentID} /> */}
          {/* } */}
        </div>
        <div className="createClassDiv">
          <input
            disabled={role === "student"}
            onChange={
              !studentID
                ? handleChange
                : (e) => setEditData({ ...editData, eLoginID: e.target.value })
            }
            name="loginID"
            value={!studentID ? loginID : eLoginID}
            placeholder="Assign a Reg-NO or Email e.g 2020101AD or teacher@gmail.com"
          />
        </div>
        <div className="createClassDiv">
          <input
            disabled={studentID}
            onChange={handleChange}
            value={!studentID ? DOB : eDOB}
            name="DOB"
            placeholder="Enter date of birth"
            type="date"
          />
          {/* <label>Enter date of birth</label> */}
        </div>
        <div className="createClassDiv">
          {/* <input value={class} name='class' placeholder='Enter Student Class' /> */}
          <select
            onChange={
              !studentID
                ? handleChange
                : (e) =>
                    setEditData({ ...editData, eUserClass: e.target.value })
            }
            value={!studentID ? classId : eUserClass}
            name="classId"
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="createClassDiv">
          <input
            onChange={
              !studentID
                ? handleChange
                : (e) => setEditData({ ...editData, ePassword: e.target.value })
            }
            name="password"
            value={!studentID ? password : ePassword}
            type="password"
            disabled={isStudent || eRole === "student"}
            placeholder="Enter password here | if teacher"
          />
        </div>
        <div className="createClassDiv">
          <input
            onChange={
              !studentID
                ? handleChange
                : (e) =>
                    setEditData({ ...editData, ePhoneNumber: e.target.value })
            }
            name="phoneNumber"
            value={!studentID ? phoneNumber : ePhoneNumber}
            type="tel"
            placeholder="Enter Phone Number"
          />
        </div>
        <button type="submit">{!studentID ? "Create" : "Edit"}</button>
      </form>
    </div>
  );
}

export default CreateStudent;
