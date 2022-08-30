import React from 'react'
// import './resultTemplate.css'

function ResultTemplate() {
    return (
        <div className='div-body'>
        <div className="temp-container">
      <header>
          <div className="heading1">
              <h2>ANAMBRA STATE SCHOOL SYSTEM</h2>
              <h1>DE Resonance MODEL SECONDARY SCHOOL</h1>
              <h5>(Government Approved)</h5>
              <h6><span>Motto:</span> Knowledge and Fear of God</h6>
            </div>
            <div className="heading2">
                <div className="heading2Item">
                    <h4>Campus 1</h4>
                    <p>Umukwa Road</p>
                    <p>Behind St. Faith Anglican</p>
                    <p>Church Awka</p>
                </div>
                <div className="heading2Item">
                    <h4>Campus 2</h4>
                    <p>Akamanato Mgbakwu,</p>
                    <p>Awka,</p>
                    <p>Anambra State</p>
                </div>
                <div className="heading2Item">
                    <h4>Campus 3</h4>
                    <p>No. 67 Goody Ezenagu Avenue</p>
                    <p>Amaede village, Mgbakwu,</p>
                    <p>Anambra State</p>
                </div>
            </div>
      </header>
      <h1 className="class-cat-head">STATEMENT OF RESULT FOR JUNIOR SECONDARY SCHOOL.</h1>
      <div className="student-details">
          <p className="student-name">Name: <span className="span-content"></span></p>
          <p className="student-details-span2">
              <span className="student-class">Class:<span className="span-content"></span></span>
              <span className="student-examNo">Exam. No: <span className="span-content"></span></span>
          </p>
          <p className="student-details-span2">
              <span className="student-term">Term: <span className="span-content"></span></span>
              <span className="student-session">Session: <span className="span-content"></span></span>
          </p>
      </div>
      <h1 className="details-title">THE FOLLOWING ARE THE DETAILS OF YOUR RESULT.</h1>
      <table>
        <tr>
            <th>SUBJECTS</th>
            <th>TEST</th>
            <th>EXAM</th>
            <th>TOTAL</th>
            <th>GRADE</th>
            <th>RESULT</th>
        </tr>
        {/* <tr>
            <td>ENGLISH LANGUAGE</td>
            <td>22</td>
            <td>50</td>
            <td>70</td>
            <td>A</td>
            <td>Excellent</td>
        </tr>
        <tr>
            <td>MATHEMATICS</td>
            <td>22</td>
            <td>50</td>
            <td>70</td>
            <td>A</td>
            <td>Excellent</td>
        </tr>
        <tr>
            <td>IGBO</td>
            <td>22</td>
            <td>50</td>
            <td>70</td>
            <td>A</td>
            <td>Excellent</td>
        </tr>
        <tr>
            <td>BASIC TECHNOLOGY</td>
            <td>22</td>
            <td>50</td>
            <td>70</td>
            <td>A</td>
            <td>Excellent</td>
        </tr>
        <tr>
            <td>SOCIAL STUDIES</td>
            <td>22</td>
            <td>50</td>
            <td>70</td>
            <td>A</td>
            <td>Excellent</td>
        </tr>
        <tr>
            <td>ENGLISH LANGUAGE</td>
            <td>22</td>
            <td>50</td>
            <td>70</td>
            <td>A</td>
            <td>Excellent</td>
        </tr>
        <tr>
            <td>CIVICS EDUCATION</td>
            <td>22</td>
            <td>50</td>
            <td>70</td>
            <td>A</td>
            <td>Excellent</td>
        </tr>
        <tr>
            <td>COMPUTER SCIENCE</td>
            <td>22</td>
            <td>50</td>
            <td>70</td>
            <td>A</td>
            <td>Excellent</td>
        </tr>
        <tr>
            <td>AGRICULTURAL SCIENCE</td>
            <td>22</td>
            <td>50</td>
            <td>70</td>
            <td>A</td>
            <td>Excellent</td>
        </tr>
        <tr>
            <td>CULTURAL & CREATIVE ART</td>
            <td>22</td>
            <td>50</td>
            <td>70</td>
            <td>A</td>
            <td>Excellent</td>
        </tr>
        <tr>
            <td>C.R.S</td>
            <td>22</td>
            <td>50</td>
            <td>70</td>
            <td>A</td>
            <td>Excellent</td>
        </tr>
        <tr>
            <td>BUSINESS STUDIES</td>
            <td>22</td>
            <td>50</td>
            <td>70</td>
            <td>A</td>
            <td>Excellent</td>
        </tr>
        <tr>
            <td>HOME ECONOMICS</td>
            <td>22</td>
            <td>50</td>
            <td>70</td>
            <td>A</td>
            <td>Excellent</td>
        </tr>
        <tr>
            <td>PHYSICAL & HEALTH EDU.</td>
            <td>22</td>
            <td>50</td>
            <td>70</td>
            <td>A</td>
            <td>Excellent</td>
        </tr>
        <tr>
            <td>MORAL INSTRUCTION</td>
            <td>22</td>
            <td>50</td>
            <td>70</td>
            <td>A</td>
            <td>Excellent</td>
        </tr>
        <tr>
            <td>FRENCH</td>
            <td>22</td>
            <td>50</td>
            <td>70</td>
            <td>A</td>
            <td>Excellent</td>
        </tr>
        <tr>
            <td>MUSIC</td>
            <td>22</td>
            <td>50</td>
            <td>70</td>
            <td>A</td>
            <td>Excellent</td>
        </tr> */}
      </table>
      <footer>
          <div className="footer-row">
              <div className="footer-score">Total Score: <span className="span-content"></span></div>
              <div className="footer-average">Average: <span className="span-content"></span></div>
              <div className="footer-position">Position: <span className="span-content"></span></div>
              <div className="footer-out-of">Out of: <span className="span-content"></span></div>
          </div>
          <div className="footer-row">
            <div className="footer-comment">Comment: <span className="span-content"></span></div>
          </div>
          <div className="footer-row">
            <div className="footer-resumption">Resumption Date: <span className="span-content"></span></div>
            <div className="footer-principal">Principal: <span className="span-content"></span></div>
          </div>
      </footer>
    </div>
    </div>
    )
}

export default ResultTemplate
