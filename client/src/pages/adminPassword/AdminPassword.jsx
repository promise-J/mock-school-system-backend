/* eslint-disable */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import Loading from "../../components/loading/Loading";
import "./AdminPassword.css";

function AdminPassword() {
  const user = useSelector((state) => state.auth.user);
  const [cards, setCards] = useState("");
  const [cardTotal, setCardTotal] = useState(0);
  const [invalidCards, setInvalidCards] = useState(0);
  const [reqCard, setReqCard] = useState(5);
  const [purchaseSent, setPurchaseSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialState = {
    email: "",
    // password1: '',
    password2: "",
    error: "",
    success: "",
  };

  const currentUser = user?.user;
  const [data, setData] = useState(initialState);
  const { email, password2, success, error } = data;
  // useEffect(()=>{
  //     setData({...data, email: user.loginID})
  // },[user.loginID, data])

  useEffect(() => {
    try {
      const getCards = async () => {
        setLoading(true);
        const res = await axios.get("/scratch");
        setCards(res.data.cards);
        setCardTotal(res.data.total);
        setInvalidCards(res.data.invalidCards);
        setLoading(false);
      };
      getCards();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const cardPercent = () => {
    let result = ((cardTotal - invalidCards) * 100) / cardTotal;
    return Math.floor(result);
  };


  return (
    <div>
      <Layout>
        <div className="adminPassword dashboard">
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="cardRequest">
                <h2>SCRATCH CARD INFO</h2>
                {cards.length > 0 &&
                <div className="cardAnalysis">
                  <div className="cardAnalysisOne">
                    <span>
                      <b>Card Total</b>
                    </span>
                    <span
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        color: "blue",
                        border: "1px solid blue",
                        cursor: 'pointer'
                      }}
                    >
                      {cardTotal}
                    </span>
                  </div>
                  <div className="cardAnalysisOne">
                    <span>
                      <b>Card Used</b>
                    </span>
                    <span
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        color: "red",
                        border: "1px solid red",
                        cursor: 'pointer'
                      }}
                    >
                      {invalidCards}
                    </span>
                  </div>
                  <div className="cardAnalysisOne">
                    <span>
                      <b>Card Valid</b>
                    </span>
                    <span style={{ color: "green", border: "1px solid green", cursor: 'pointer' }}>
                      {cardTotal - invalidCards}
                    </span>
                  </div>
                  <div className="cardAnalysisOne">
                    <div
                      className="cardBattery"
                      style={{
                        border:
                          cardPercent() < 15
                            ? "red 1px solid"
                            : "1px solid green",
                      }}
                    >
                      <span
                        className="batteryCap"
                        style={{
                          background: cardPercent() < 15 ? "red" : "green",
                        }}
                      ></span>
                      <div
                        className="cardBatteryValue"
                        style={{
                          cursor: 'pointer',
                          background:
                            cardPercent() <= 15
                              ? "red"
                              : cardPercent() > 16 && cardPercent() < 70
                              ? "lightgreen"
                              : "green",
                          height:
                            cardPercent() < 5
                              ? cardPercent() + 4 + "%"
                              : cardPercent() + "%",
                        }}
                      ></div>
                    </div>
                    <span>
                      <b>{cardPercent()}%</b>
                    </span>
                    <span
                      style={{
                        animation:
                          cardPercent() < 15 ? "alert 1s infinite" : "none",
                        color: cardPercent() < 15 ? "red" : "green",
                      }}
                      className="batteryAlertText"
                    >
                      {cardPercent() < 30
                        ? "Please Recharge"
                        : cardPercent() <= 80 && cardPercent() >= 30
                        ? "Card  is Enough"
                        : "Sufficient Card"}
                    </span>
                  </div>
                  <span>
                    <b>
                      {cardPercent() === "NaN" ? 0 : Number(cardPercent())}%
                    </b>
                  </span>
                  <span
                    style={{
                      animation:
                        cardPercent() < 15 ? "alert 1s infinite" : "none",
                      color: cardPercent() < 15 ? "red" : "green",
                    }}
                    className="batteryAlertText"
                  >
                    {cardPercent() < 30
                      ? "Please Recharge"
                      : cardPercent() <= 80 && cardPercent() >= 30
                      ? "Card  is Enough"
                      : "Sufficient Card"}
                  </span>
                </div>
                }
              </div>
            </>
          )}
        </div>
      </Layout>
    </div>
  );
}

export default AdminPassword;
