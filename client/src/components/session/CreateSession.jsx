// import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Alert from "../alert/Alert";
import {useNotify} from '../../customHooks'
import { axiosRequest } from "src/utils/axiosRequest";

function CreateSession() {
  const notify = useNotify()
  const initialState = {
    currentTerm: "",
    year: "",
    error: "",
    success: "",
  };

  const editData = {
    currentTerm: "",
    year: "",
  };

  const [data, setData] = useState(initialState);
  const [eData, setEData] = useState(editData);
  const { sessionID } = useParams();
  const history = useHistory();
  const { year, currentTerm, success, error } = data;

  // const {eYear, eCurrentTerm} = editData
  useEffect(() => {
    if (sessionID) {
      const getEdit = async () => {
        const { data } = await axiosRequest.get(`/session/${sessionID}`);
        setEData({ year: data.year, currentTerm: data.currentTerm });
      };
      getEdit();
    }
  }, [sessionID]);

  const handleInput = (e) => {
    const { value, name } = e.target;
    if (!sessionID) {
      setData({ ...data, [name]: value });
    } else {
      setEData({ ...eData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const terms = ["first", "second", "third"];
    if (sessionID) {
      if (!terms.includes(eData.currentTerm.toLowerCase())) {
        // return setData({
        //   ...data,
        //   success: "",
        //   error: "Term must Either be first, second or third",
        // });

        return notify('error', 'Term must Either be first, second or third')
      }
      await axiosRequest.put(`/session/${sessionID}`, {
        currentTerm: eData.currentTerm.toLowerCase(),
      });
      // setData({ ...data, success: res.data });
      notify('success', 'Edit Successful')
      history.push("/viewSession");
    } else {
      if (!year || !currentTerm) {
        // return setData({
        //   ...data,
        //   success: "",
        //   error: "Fields must not be empty",
        // });
        return notify('error', 'Fields must not be empty')
      }
      if (!terms.includes(currentTerm.toLowerCase())) {
        // return setData({
        //   ...data,
        //   success: "",
        //   error: "Term must either be first, second or third",
        // });
        return notify('error', 'Term must either be first, second or third')
      }
      try {
        const res = await axiosRequest.post("/session", {
          year,
          currentTerm: currentTerm.toLowerCase(),
        });
        console.log(res);
        setData({ ...data, success: res.data, error: "" });
        notify('success', 'Session Created')
        history.push("/viewSession");
      } catch (error) {
        // setData({ ...data, success: "", error: error.response.data });
        return error?.response?.data && notify('error', error?.response?.data)
        // setTimeout(()=>{
        //     setData({...data, success: '', error: ''})
        // },3000)
      }
    }
  };

  return (
    <div className="dashboard">
      {/* <h1 className='dashboardBodyHeading'>Create Session</h1> */}
      <form onSubmit={handleSubmit} className="createClassForm">
        {error && (
          <Alert type="err-msg" message={error} setData={setData} data={data} />
        )}
        {success && (
          <Alert
            type="suc-msg"
            message={success}
            setData={setData}
            data={data}
          />
        )}

        <h2>Create Session</h2>
        <div className="createClassDiv">
          <input
            onChange={handleInput}
            value={sessionID ? eData.year : year}
            disabled={sessionID}
            name="year"
            placeholder="Enter Session year e.g 2020, 2021 "
          />
        </div>
        <div className="createClassDiv">
          <input
            onChange={handleInput}
            value={sessionID ? eData.currentTerm : currentTerm}
            name="currentTerm"
            placeholder="Enter Current term e.g first, second, third "
          />
        </div>
        <button type="submit">Create Session</button>
      </form>
    </div>
  );
}

export default CreateSession;
