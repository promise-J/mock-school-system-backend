// import axios from 'axios'
import { useState } from 'react'
import { axiosRequest } from 'src/utils/axiosRequest'
import './footer.css'

function Footer() {
    const [content, setContent] = useState('')
    const sendMail = async()=>{
        try {
            await axiosRequest.post('/users/emailing', {content, senderEmail: 'UnknownUser@gmail.com'})
            setContent('')
        } catch (error) {
            console.log(error)              
        }
    }

    return (
        <footer>
            <div className="footer1">
                <div className="footer1-div">
                    <h1>Resonance ACADEMY SCHOOL.</h1>
                    <p>EQUIPPING LEADERS THE LEADERS OF TOMMORROW...</p>
                </div>
                <div className="footer1-div">
                    Amaede Mgbakwu. Awka North, Anambra State.
                </div>
                <div className="footer1-div">
                    <span>
                        Umujago, Awka. Awka South, Anambra State.
                    </span>
                    <span>
                        +2348033535935, +23490533953994.
                    </span>
                </div>
                <div className="footer1-div">
                    <span>
                        +234509350359, +234704639535
                    </span>
                </div>
            </div>
            <div className="footer2">
                <h1>FOLLOW US ON SOCIAL MEDIA</h1>
                <div className="footer2-div">
                    <span>Facebook</span>
                   <i className="fab fa-facebook-square"></i>
                </div>
                <div className="footer2-div">
                    <span>Twitter</span>
                    <i className="fab fa-twitter-square"></i>
                </div>
                <div className="footer2-div">
                    <span>Instagram</span>
                    <i className="fab fa-instagram-square"></i>
                </div>
            </div>
            <div className="footer3">
              <h1>Personal Contributions</h1>
              <div className="footer3-div">
                  <h5>SEND US A MESSAGE</h5>
                  <div className="footer3-inputDiv">
                      <input type="text" name='content' value={content} onChange={(e)=> setContent(e.target.value)} placeholder="Send Us A Message!" />
                      <button onClick={sendMail}>SEND</button>
                  </div>
              </div>
            </div>
          </footer>
    )
}

export default Footer
