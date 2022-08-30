import "./Enquiry.css";
import { Check, Clear } from "@material-ui/icons";
// import axios from "axios";
import React, { useState } from "react";
import styled from 'styled-components'
import { axiosRequest } from "src/utils/axiosRequest";




const InputSpan = styled.span`
    font-size: 12px;
    color: ${props=> props.color};
    margin-top: 5px;
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    padding: 0 5px;
    letter-spacing: 3px;
    margin-left: auto;
    transition: 1s all ease;
`


function Enquiry() {
  const [check, setCheck] = useState(false);
  const [content, setContent] = useState('')
  const [email, setEmail] = useState('')
  const handleCheck = (e) => {
    if (e.target.checked) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };


  const emailMatch = (e)=>{
    return String(e).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // return e.length > 4
   }

  const sendMail = async(e)=>{
    e.preventDefault()
    try {
        const res = await axiosRequest.post('/users/emailing', {content, senderEmail: email})
        console.log(res.data)
        setContent('')
        setEmail('')
    } catch (error) {
        console.log(error)              
    }
}

  return (
    <div className="enquiry">
      <label>
        <input onChange={handleCheck} type="checkbox" />
        <span></span>
        <i className="indicator"></i>
      </label>
      {/* <div className="welcome">
                <div className="s-h"></div>
            </div> */}
      <h1 style={{ opacity: check ? "1" : "0.1" }}>
        {!check ? "SWITCH ON THE MODE" : "ASK US ANYTHING"}. (MOOD{" "}
        {check ? "ON" : "OFF"})
      </h1>
      <p
        style={{
          color: "white",
          textAlign: "center",
          opacity: check ? "1" : "0.1",
        }}
      >
        THIS IS A PRIVATE ZONE. WE WILL KEEP YOUR MESSAGES SAFE!
      </p>
      {/* <Link style={{color: 'white'}} to='/'>Home</Link> */}
      <form onSubmit={sendMail} className="createClassForm" style={{ opacity: check ? "1" : "0" }}>
        <div className="createClassDiv">
          <input name='email' type="text"
           value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Tell us your name" />
        </div>
        {
          emailMatch(email) ? 
          <InputSpan style={{display: !email && 'none'}} color='#00ff00'>Verification Confirmed <Check style={{fontSize: '13px'}}/></InputSpan> :
          <InputSpan style={{display: !email && 'none'}} color='red'>email Verification Failed <Clear style={{fontSize: '13px'}}/></InputSpan>
        }
        {/* <div className="createClassDiv"> */}
        <textarea name="content" value={content} onChange={(e)=> setContent(e.target.value)} 
        placeholder="Write us your message here"></textarea>
        {/* </div> */}
        <button>SUBMIT</button>
      </form>
    </div>
  );
}

export default Enquiry;
