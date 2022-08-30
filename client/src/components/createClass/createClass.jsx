import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./createClass.css";
// import { useParams } from 'react-router-dom'
// import axios from "axios";
import { useSelector } from "react-redux";
import Loading from "../loading/Loading";
import {useNotify} from '../../customHooks'
import { axiosRequest } from "src/utils/axiosRequest";
// import Alert from '../alert/Alert';
/* eslint-disable */
function CreateClass() {
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [code, setCode] = useState("");
  // const [editSubjects, setEditSubjects] = useState([])
  const [allSubjects, setAllSubjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const notify = useNotify()
  
  // const [eClass, setEClass] = useState('maths')

  const { role } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    const getAllSubjects = async () => {
      try {
        setLoading(true);
        const res = await axiosRequest.get("/subject");
        setAllSubjects(res.data.subjects);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getAllSubjects();
  }, []);

  const handleCheck = (e) => {
    let checked = e.target.checked;
    const { value } = e.target;
    if (checked) {
      setSubjects([...subjects, value]);
    } else {
      setSubjects((prev) => prev.filter((i) => i !== e.target.value));
    }
  };

  const handleCode = (e) => {
    // if(e.target.value.length < 3){
    //    return setError('Code must be a 3 digit number')
    // }
    setCode(e.target.value);
    // setError('')
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //   const res =
      await axiosRequest.post("/class", { subjects, name: name.toUpperCase(), code });
      // setSuccess("Class Created");
      notify('success', 'Class Created')
      setSubjects([]);
      setCode("");
      setName("");
      history.push("/viewClass");
      // window.location.href = "viewClass";
    } catch (error) {
      error.response.data && notify('error', error?.response?.data)
    }
  };

  return (
    <>
      {loading ? (
        <h1 className="loading-text">
          <Loading />
        </h1>
      ) : (
        <form onSubmit={handleSubmit} className="createClassForm">
          <h2>Create Student Class</h2>
          {/* {error && <Alert data=/>} */}
          {error && <div className="err-msg">{error}</div>}
          {success && <div className="suc-msg">{success}</div>}
          <div className="createClassDiv">
            <input
              onChange={handleName}
              disabled={role !== "superuser"}
              value={name}
              name="name"
              placeholder="Enter a class e.g SS1, JSS3..."
            />
          </div>
          <div className="createClassDiv">
            <input
              onChange={handleCode}
              disabled={role !== "superuser"}
              value={code}
              name="code"
              placeholder="Enter a 3 digit class code e.g 110"
            />
          </div>
          <p>Choose Subjects for the class</p>
          <div className="createClassSubject">
            {allSubjects.map((subject) => (
              <span key={subject._id}>
                <input
                  onChange={handleCheck}
                  disabled={role !== "superuser"}
                  name="subject"
                  value={subject._id}
                  type="checkbox"
                />
                {subject.name}
              </span>
            ))}
          </div>
          <button disabled={role !== "superuser"} type="submit">
            Create Class
          </button>
        </form>
      )}
    </>
  );
}

export default CreateClass;
