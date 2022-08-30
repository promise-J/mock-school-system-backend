import React from "react";
import "./alert.css";

function Alert({ type, message, setData, data }) {
  const toggleDisplay = () => {
    // setDisplay(false)
    setData({ ...data, error: "", success: "" });
  };
  return (
    <div className={type}>
      <span className="msg-span">{message}</span>
      <span onClick={toggleDisplay} className="cancel-span">
        X
      </span>
    </div>
  );
}

export default Alert;
