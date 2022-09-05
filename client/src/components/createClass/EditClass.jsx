import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Loading from "../loading/Loading";
import {useNotify} from '../../customHooks'
import { isPrincipal } from "src/utils/roleChecks";

function EditClass() {
  const { classID } = useParams();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [editSubjects, setEditSubjects] = useState([]);
  const [classSubjects, setClassSubjects] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const notify = useNotify()


  const { role } = useSelector((state) => state.auth);

  const getSingleClass = async () => {
    const res = await axios.get(`/class/${classID}`);
    setName(res.data.name);
    setCode(res.data.code);

    const subjectIdMap = res.data.subjects.map((s) => s.id);
    setEditSubjects(subjectIdMap);
    setClassSubjects(subjectIdMap);
  };

  const getAllSubjects = async () => {
    try {
      const res = await axios.get("/subject");
      setAllSubjects(res.data.subjects);
    } catch (error) {
      console.log(error);
    }
    //
  };
  useEffect(() => {
    if (classID) {
      Promise.all([getAllSubjects(), getSingleClass()]).then(() => {
        setLoading(false);
      });
    }
    // eslint-disable-next-line
  }, [classID]);

  const handleCheck = (e) => {
    const checked = e.target.checked;
    const { value } = e.target;
    if (classID) {
      if (checked) {
        if (!editSubjects.includes(value)) {
          setEditSubjects([...editSubjects, value]);
        }
      } else {
        setEditSubjects(editSubjects.filter((id) => id !== value));
      }
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log({ editSubjects });
    e.preventDefault();
    if (
      classID &&
      isPrincipal(role) &&
      editSubjects.join("") !== classSubjects.join("")
    ) {
      setUpdating(true);

      try {
        await axios.put(`/class/${classID}`, {
          subjects: editSubjects,
          name,
          code,
        });

        setClassSubjects([...editSubjects]);
        setCode(code)
        setName(name)
        setUpdating(false);
        notify('success', 'Successfully updated')
      } catch (error) {
        error?.response?.data && notify('error', error?.response?.data);
      }
    } else {
    }
  };

  return (
    <>
      {loading || updating ? (
        <h1 className="loading-text">
          <Loading />
        </h1>
      ) : (
        <form onSubmit={handleSubmit} className="createClassForm">
          <h2>Edit Student Class</h2>
          {role === "superuser" ? (
            <>
              <p>Modify the Class Name</p>
              <div className="createClassDiv">
                <input
                  disabled={!isPrincipal(role)}
                  onChange={handleName}
                  value={name}
                  name="name"
                  placeholder="Enter a class e.g SS1, JSS3..."
                />
              </div>
              <p style={{ color: "red" }}>This field should not be modified</p>
              <div className="createClassDiv">
                <input
                  disabled={role !== "superuser"}
                  onChange={(e) => setCode(e.target.value)}
                  value={code}
                  name="code"
                  // placeholder="Enter a class e.g SS1, JSS3..."
                />
              </div>
              <p>Modify Subjects for the class</p>
              <div className="createClassSubject">
                {allSubjects.map((subject) => (
                  <span key={subject.id}>
                    {
                      <input
                        type="checkbox"
                        name="subject"
                        value={subject.id}
                        onChange={handleCheck}
                        defaultChecked={classSubjects.includes(subject.id)}
                      />
                    }
                    {subject.name}
                  </span>
                ))}
              </div>
              <button
                className={`${updating ? "loading" : ""}`}
                disabled={editSubjects.join("") === classSubjects.join("")}
                type="submit"
              >
                {classID ? "Edit" : "Create"} Class
              </button>
            </>
          ) : (
            <h1>You are not allowed to do this</h1>
          )}
        </form>
      )}
    </>
  );
}

export default EditClass;
