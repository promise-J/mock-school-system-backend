// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Loading from "../loading/Loading";
import {useNotify} from '../../customHooks'
import { axiosRequest } from "src/utils/axiosRequest";

function CreateSubject() {
  const { subjectID } = useParams();
  const history = useHistory();
  const notify = useNotify()
  const initialState = {
    error: "",
    success: "",
    name: "",
  };

  const [editName, setEditName] = useState("");

  const { role } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(initialState);

  const { name, error, success } = data;

  useEffect(() => {
    if (subjectID && role === "superuser") {
      setLoading(true);
      const getSingleClass = async () => {
        const res = await axiosRequest.get(`/subject/${subjectID}`);
        setEditName(res.data.name);
        setLoading(false);
      };
      getSingleClass();
    }
  }, [subjectID, data, role]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // setLoading(true)
      // const res =
      await axiosRequest.post("/subject", { name: name.toUpperCase() });
      // setData({...data, success: res.data, error: ''})
      // setTimeout(()=>{
      //   setData({...data, success: "", error: ""})
      // }, 3000)
      // setLoading(false)
      notify('success', 'Subject Created!')
      history.push("/viewSubject");
    } catch (error) {
      error.response?.data &&
      //   setData({ ...data, error: error.response?.data, success: "" });
      // setTimeout(() => {
      //   setData({ ...data, error: "", success: "" });
      // }, 3000);
      notify('error', error?.response?.data)
      setLoading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axiosRequest.put(`/subject/${subjectID}`, {
        name: editName.toUpperCase(),
      });
      // setData({ ...data, success: "Updated Success!" });
      notify('success', 'Update Successful')
      history.push("/viewSubject");
    } catch (error) {
      error.response.data &&
      notify('error', error?.response?.data)
        // setData({ ...data, success: "", error: error.response.data });
    }
  };
  if (loading)
    return (
      <h1 className="loading-text">
        <Loading />
      </h1>
    );

  return (
    <div className="dashboard">
      {/* <h1 className='dashboardBodyHeading'>Create Subject</h1> */}
      <form
        onSubmit={!subjectID ? handleSubmit : handleEdit}
        className="createClassForm"
      >
        {error && <div className="err-msg">{error}</div>}
        {success && <div className="suc-msg">{success}</div>}
        <h2>Create Subject</h2>
        {role === "superuser" ? (
          <>
            <div className="createClassDiv">
              <input
                onChange={
                  !subjectID
                    ? (e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    : (e) => setEditName(e.target.value)
                }
                name="name"
                value={subjectID ? editName : name}
                placeholder="Enter a Subject name e.g Mathematics"
              />
            </div>
            <button type="submit">
              {!subjectID ? "Create Subject" : "Edit Subject"}
            </button>
          </>
        ) : (
          <h1>You are not allowed to do this</h1>
        )}
      </form>
    </div>
  );
}

export default CreateSubject;
