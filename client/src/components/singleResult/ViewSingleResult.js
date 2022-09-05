/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ResultRow from "../resultRow/ResultRow";
import Loading from "../loading/Loading";

function ViewSingleResult() {
  const { resultID } = useParams();

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resultID) {
      setLoading(true);
      const getResult = async () => {
        const { data } = await axios.get(`/result/${resultID}`);
        setResult(data.result);
        setLoading(false);
      };
      getResult();
    }
  }, [resultID]);

  if (loading){
    return (
      <div className="dashboard">
        <h1 className="loading-text">
          <Loading />
          {/* loading */}
        </h1>
      </div>
    );}

  // return <h1>{JSON.stringify(result)}</h1>;
  return (
    result && (
      <div className="dashboard">
        <h1
          className="dashboardBodyHeading"
          style={{ textAlign: "center", fontWeight: "lighter" }}
        >
          {result?.student.loginID + ' '} Result Page
        </h1>
        {/* <h1 className="dashboardBodyHeading">
          {result.student.firstName} {result.student.lastName}
          <p>
            Reg Number: <b>{result.student.loginID}</b>
          </p>
          <p>Current term {result.term}</p>
        </h1> */}
        <div className="studentInfo">
          <div className="studentInfoKey">
            <p>
              <b>STUDENT:</b>
            </p>
            <p>
              <b>REGISTRATION NO.:</b>
            </p>
            <p>
              <b>CURRENT TERM:</b>
            </p>
            <p>
              <b>Student Class:</b>
            </p>
          </div>
          <div className="studentInfoValue">
            <p>
              {result.student.firstName} {result.student.middleName[0]}.{" "}
              {result.student.lastName}
            </p>
            <p>{result.student.loginID}</p>
            <p>{result.term}</p>
            <p style={{ marginBottm: "10px" }}>{"me"}</p>
          </div>
        </div>
        <table className="viewClassTable">
          <thead>
            <tr>
              <th>Subject</th>
              <th>TEST 1</th>
              <th>TEST 2</th>
              <th>Exam</th>
              <th>Total Score</th>
              <th>Grade</th>
              <th>EDIT</th>
            </tr>
          </thead>
          <tbody>
            {result.items.map((item) => (
              <ResultRow studentName={result?.student.firstName}  key={item._id} item={item} />
            ))}
          </tbody>
        </table>
        <Link className="viewClassLink" to="/createResult">
          Create Result
        </Link>
      </div>
    )
  );
}

export default ViewSingleResult;
