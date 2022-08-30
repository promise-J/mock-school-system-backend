import React from 'react'
import Footer from 'src/components/footer/Footer'
import Header from 'src/components/header/Header'
import './prefect.css'

function Prefect() {
    return (
        <div className='prefects'>
            <Header />
            <div className="welcome">
                <h1 className="welcome-home">OUR PREFECTS</h1>
                <div className="s-h"></div>
            </div>
            <div className="prefects-text">
                <p><span className='first-text'>A</span> gallery of our prestigious prefects. </p>
            </div>
            <div className="prefects-images">
              <div className="prefect-image">
                  <div className="prefect-name">
                      <p>Senior Prefect</p>
                      <small>Gilbert Chidera</small>
                  </div>
              </div>
              <div className="prefect-image">
              <div className="prefect-name">
                      <p>Social Prefect</p>
                      <small>Chinadi Okafor</small>
                  </div>
              </div>
              <div className="prefect-image">
              <div className="prefect-name">
                      <p>Laboratory Prefect</p>
                      <small>Okafor Sopuru</small>
                  </div>
              </div>
              <div className="prefect-image">
              <div className="prefect-name">
                      <p>Asst. Puntuality Prefect</p>
                      <small>Uyammadu Ifeoma</small>
                  </div>
              </div>
              <div className="prefect-image">
              <div className="prefect-name">
                      <p>Labour Prefect</p>
                      <small>Okafor Onyedika</small>
                  </div>
              </div>
              <div className="prefect-image">
              <div className="prefect-name">
                      <p>Punctuality Prefect</p>
                      <small>Osonwa Joseph</small>
                  </div>
              </div>
              <div className="prefect-image">
              <div className="prefect-name">
                      <p>Chaplain Prefect</p>
                      <small>Okoye Mmesoma</small>
                  </div>
              </div>
              <div className="prefect-image">
              <div className="prefect-name">
                      <p>Asst. Social Prefect</p>
                      <small>Egbunike Emeka</small>
                  </div>
              </div>
              <div className="prefect-image">
              <div className="prefect-name">
                      <p>Asst. Labour Prefect</p>
                      <small>Anaje Favour</small>
                  </div>
              </div>
              <div className="prefect-image">
              <div className="prefect-name">
                      <p>Regulatory Prefect</p>
                      <small>Alpha Emmanuel</small>
                  </div>
              </div>
              {/* <div className="prefect-image">
              <div className="prefect-name">
                      <p>Asst. Labour Prefect</p>
                      <small>Anaje Favour</small>
                  </div>
              </div>
              <div className="prefect-image">
              <div className="prefect-name">
                      <p>Regulatory Prefect</p>
                      <small>Alpha Emmanuel</small>
                  </div>
              </div> */}
            </div>
            <Footer />
        </div>
    )
}

export default Prefect
