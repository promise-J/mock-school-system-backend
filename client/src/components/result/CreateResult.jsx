import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNotify } from "../../customHooks";
import {useHistory} from 'react-router-dom'

function CreateResult() {
  const notify = useNotify();
  const history = useHistory()
  const [student, setStudent] = useState("");
  const [session, setSession] = useState("");

  const [currentTerm, setCurrentTerm] = useState("");

  const [students, setStudents] = useState([]);

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      const { data } = await axios.get("/users/all/students");
      const { students } = data;
      setStudents(students);
    };
    getStudents();
  }, []);

  useEffect(() => {
    const getSessions = async () => {
      const res = await axios.get("/session/all/session");
      setSessions(res.data.sessions);
    };
    getSessions();
  }, []);

  function resetForm() {
    setCurrentTerm("");
    setStudent("");
    setSession("");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/result`, {
        term: currentTerm,
        studentId: student,
        session,
      });

      notify("success", "Result Created!");
      history.push('/viewResult')
      resetForm();
    } catch (error) {
      notify("error", error.response.data.msg);
    }
  };

  return (
    <div className="dashboard">
      {/* <h1 className='dashboardBodyHeading'>Create Result</h1> */}
      <form onSubmit={handleSubmit} className="createClassForm">
        <h2>Create Result</h2>

        <div className="createClassDiv">
          <select value={student} onChange={(e) => setStudent(e.target.value)}>
            <option
            // value={student}
            >
              Select a student
            </option>
            {students?.map((student) => (
              <option key={student._id} value={student._id}>
                {student.firstName} {student.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="createClassDiv">
          <select
            onChange={(e) => setCurrentTerm(e.target.value)}
            value={currentTerm}
            name="term"
          >
            <option value="">Select Term</option>
            <option value="first">First</option>
            <option value="second">Second</option>
            <option value="third">Third</option>
          </select>
        </div>
        <div className="createClassDiv">
          {/* <input placeholder="Enter Session" /> */}
          <select
            value={session}
            name="session"
            onChange={(e) => setSession(e.target.value)}
          >
            <option value="">Select a Session</option>
            {sessions?.map((session) => (
              <option key={session._id} value={session._id}>
                {session.year}/{session.year + 1}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Create Result</button>
      </form>
    </div>
  );
}

export default CreateResult;
