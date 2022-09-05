import React, { useEffect, useState } from "react";
import "./resultCheck.css";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Logo from "../../images/image.jpg";
import { dispatchLogout } from "src/redux/actions/authAction";
import { useDispatch } from "react-redux";

function ResultCheck() {
  const [result, setResult] = useState(null);
  // const [cardInfo, setCardInfo] = useState(null);
  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch()

  useEffect(() => {
    const { resultId } = location.state;
    if (resultId) {
      const getResult = async () => {
        try {
          const res = await axios.get(`/result/${resultId}`);
          console.log(res.data, 'the check data')
          setResult(res.data.result);
          // setCardInfo(res.data.card);
        } catch (error) {
          console.log(error.response.data, 'this is the error check')
        }
      };
      getResult();
    } else {
      history.push("/resultSearch");
    }
  }, [location, history]);

  const handleLogout = async () => {
    try {
      await axios.get("/users/logout");
      // localStorage.removeItem("firstLogin");
      dispatch(dispatchLogout());
      history.push("/");
    } catch (error) {
      dispatch(dispatchLogout());
      history.push("/");
    }
  };

  return (
    result &&
   (
      <div className="resultCheck-container">
          <span onClick={handleLogout} style={{background: 'green', color: 'white', padding: '1px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px', width: 'fit-content', borderRadius: 5, cursor: 'pointer', boxShadow: '2px 2px 2px 2px gray'}}>Go Back</span>
        <div className="resultCheck">
          <header>
            <div className="logo">
              <img src={Logo} alt="" />
              <h4>DE Resonance MODEL ACADEMY MGBAKWU</h4>
            </div>
            <div className="resulthead">
              <h1>STUDENT RESULT</h1>
            </div>
          </header>
          <main>
            <div className="main-container">
              <h4>Candidate Information</h4>
              <div className="candidate-info">
                <div className="candidate-key">
                  <p>Student LoginID</p>
                  <p>Student Name</p>
                  <p>Student Class</p>
                  <p>Session</p>
                  <p>Term</p>
                </div>
                <div className="candidate-value ist">
                  <p>{result?.student?.loginID}</p>
                  <p>
                    {result?.student?.firstName} {result?.student?.lastName}
                  </p>
                  <p>{result.student?.class?.name}</p>
                  <p>
                    <span>{result?.session?.year}/</span>
                    <span>{result?.session?.year + 1}</span>
                  </p>
                  <p>{result?.term}</p>
                </div>
              </div>
              <h4>Subjects Grades</h4>
              <div className="candidate-info">
                <div className="candidate-key">
                  <p>Subjects</p>
                  {result?.items?.map((item) => (
                    <p key={item?.subject?.id}>{item?.subject?.name}</p>
                  ))}
                </div>
                <div className="candidate-value score">
                  <p>
                    <span>C.A1</span>
                    <span>C.A2</span>
                    <span>EXAM</span>
                    <span>TOTAL</span>
                    <span>GRADE</span>
                  </p>
                  {result?.items?.map((item) => (
                    <p key={item?.subject?.id}>
                      <span>{item?.firstTest}</span>
                      <span>{item?.secondTest}</span>
                      <span>{item?.exam}</span>
                      <span>
                        {item?.firstTest + item?.secondTest + item?.exam}
                      </span>
                      <span>{item?.grade}</span>
                    </p>
                  ))}
                </div>
              </div>
              <h4>Card Information</h4>
              <div className="candidate-info">
                <div className="candidate-key">
                  <p>Card Use:</p>
                </div>
                <div className="candidate-value">
                  <p>
                    {/* <span>{cardInfo.usageCount}</span> of
                    <span>{cardInfo.maxUseCount}</span> */}
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  );
}

export default ResultCheck;
