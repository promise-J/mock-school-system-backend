import './homepage.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from 'react-router-dom'

import School1 from '../../images/school1.jpg'
import School2 from '../../images/school2.jpg'
import School3 from '../../images/school3.jpg'
import School4 from '../../images/school4.jpg'



function Homepage() {


    return (
      <div className="homepage">
        <Header />
        {/* <div className="divide-header"></div> */}
        <AliceCarousel
          autoPlay
          autoPlayInterval="3000"
          infinite
          fadeOutAnimation={true}
        >
          <img
            className="sliderimg"
            src={School2}
            alt="Resonance"
          />
          <img
            className="sliderimg"
            src={School3}
            alt="De Resonance"
          />
          <img
            className="sliderimg"
            src={School1}
            alt="Resonance"
          />
          <img
            className="sliderimg"
            src={School4}
            alt=""
          />
          <img
            className="sliderimg"
            src={School3}
            alt="Resonance"
          />
          {/* <img className='sliderimg' src={PF + '/gilbert.jpg'} alt="" />
            <img className='sliderimg' src={PF + '/onyedika.jpg'} alt="" />
            <img className='sliderimg' src={PF + '/ifeoma.jpg'} alt="" /> */}
        </AliceCarousel>
        <div className="welcome" data-aos="zoom-in-right">
          <h1 className="welcome-head">Welcome To Resonance Academy School</h1>
          <div className="s-h"></div>
          <p data-aos="fade-up">
            "Every great dream begins with a dreamer. Always remember, you have
            within you the strength, the patience, and the passion to reach for
            the stars to change the world. The future belongs to those who
            believe in the beauty of their dreams"
          </p>
        </div>
        <div className="welcome" data-aos="zoom-in-right">
          <h1 className="welcome-head">BRIEF TOUR</h1>
          <div className="s-h"></div>
        </div>
        <div className="image-voice">
          <div className="single-image-voice" data-aos="fade-right">
            <div className="single-content">
              <Link to="/welcome">Read More</Link>
              <p>
                You are most welcome to Resonance Academy. We are Purpose driven
                to serve you better...
              </p>
              <h1>From The Principal</h1>
            </div>
          </div>
          <div className="single-image-voice" data-aos="fade-right">
            <div className="single-content">
              <Link to="/vision">Read More</Link>
              <p>To raise a nation full of standards and morale against...</p>
              <h1>OUR VISION</h1>
            </div>
          </div>
          <div className="single-image-voice" data-aos="fade-right">
            <div className="single-content">
              <Link to="/mission">Read More</Link>
              <p>To raise daily a resilient discipline livestyle...</p>
              <h1>OUR MISSION</h1>
            </div>
          </div>
          <div className="single-image-voice" data-aos="fade-right">
            <div className="single-content">
              <Link to="/anthem">Read More</Link>
              <p>One of the greatest thing that happened...</p>
              <h1>OUR ANTHEM</h1>
            </div>
          </div>
          <div className="single-image-voice" data-aos="fade-right">
            <div className="single-content">
              <Link to="/standard">Read More</Link>
              <p>
                Every organisation that is headed aright have standards and we
                are not...
              </p>
              <h1>OUR STANDARDS</h1>
            </div>
          </div>
          <div className="single-image-voice" data-aos="fade-right">
            <div className="single-content">
              <Link to="/prefects">Read More</Link>
              <p>Our Prefects are good looking and well responsible.</p>
              <h1>Meet Our Prefects</h1>
            </div>
          </div>
        </div>
        <div className="welcome" data-aos="zoom-in-right">
          <h1 className="welcome-head">SCHOOL CLUBS</h1>
          <div className="s-h"></div>
        </div>
        <div className="image-voice">
          <div className="single-image-voice" data-aos="fade-left">
            <div className="single-content">
              <Link to="/clubs">Read More</Link>
              <p>
                Even thought you have seen enough in construction and
                Engineering field? Check this club out.
              </p>
              <h1>Engineering Club</h1>
            </div>
          </div>
          <div className="single-image-voice" data-aos="fade-left">
            <div className="single-content">
              <Link to="/clubs">Read More</Link>
              <p>How priceless to have a well improved vocabulary.</p>
              <h1>Debate and Literary</h1>
            </div>
          </div>
          <div className="single-image-voice" data-aos="fade-left">
            <div className="single-content">
              <Link to="/clubs">Read More</Link>
              <p>Singing is a talent as much as it can be developed too.</p>
              <h1>Resonance VOices</h1>
            </div>
          </div>
          <div className="single-image-voice" data-aos="fade-left">
            <div className="single-content">
              <Link to="/clubs">Read More</Link>
              <p>
                Nothing beats our well in-form dancing group. Check it out now.
              </p>
              <h1>Resonance Dancing Club</h1>
            </div>
          </div>
          <div className="single-image-voice" data-aos="fade-left">
            <div className="single-content">
              <Link to="/clubs">Read More</Link>
              <p>
                This is the center of Home Responsibility. Home dishes are
                taught and served Hot here.
              </p>
              <h1>Vocational Club</h1>
            </div>
          </div>
          <div className="single-image-voice" data-aos="fade-left">
            <div className="single-content">
              <Link to="/clubs">Read More</Link>
              <p>
                The generations of AI. We Know just how much the world depends
                on Computer that is why we are committed to this course.
              </p>
              <h1>Computer Club</h1>
            </div>
          </div>
        </div>
        <div className="welcome" data-aos="zoom-in-right">
          <h1 className="welcome-head">RATINGS AND RECOGNITIONS</h1>
          <div className="s-h"></div>
        </div>
        <div className="recommendations">
          <div className="recommendation" data-aos="zoom-in-up">
            <p>
              "Resonance is the best School by far in Awka North as far as
              quality is concerned"
            </p>
            <small>Enyi Mgbakwu.</small>
          </div>
          <div className="recommendation" data-aos="zoom-in-up">
            <p>
              "Resonance is the best School by far in Awka North as far as
              quality is concerned"
            </p>
            <small>Ngozi Osiala.</small>
          </div>
          <div className="recommendation" data-aos="zoom-in-up">
            <p>
              "Resonance is the best School by far in Awka North as far as
              quality is concerned"
            </p>
            <small>Mr/Mrs Osonwa Chidiebere</small>
          </div>
          <div className="recommendation" data-aos="zoom-in-up">
            <p>
              "Resonance is the best School by far in Awka North as far as
              quality is concerned"
            </p>
            <small>Chief Ezenugolu Maduka.</small>
          </div>
          <div className="recommendation" data-aos="zoom-in-up">
            <p>
              "Resonance is the best School by far in Awka North as far as
              quality is concerned"
            </p>
            <small>Barr. Onukwube.</small>
          </div>
          <div className="recommendation" data-aos="zoom-in-up">
            <p>
              "Resonance is the best School by far in Awka North as far as
              quality is concerned"
            </p>
            <small>Prof. Sabinus Melikam.</small>
          </div>
        </div>
        <div className="welcome" data-aos="zoom-in-right">
          <h1 className="welcome-head">WE CAN HELP YOU!</h1>
          <div className="s-h"></div>
        </div>
        <div className="recommendations">
          <div className="recommendation" data-aos="zoom-in-right">
            <div className="recommendation help">
              <div className="recommendation-img img1"></div>
              <Link to="/enquiry">Private Message us</Link>
            </div>
          </div>
          <div className="recommendation" data-aos="zoom-in-right">
            <div className="recommendation help">
              <div className="recommendation-img img1"></div>
              <Link to="#">APPLY HERE</Link>
            </div>
          </div>

          <div className="recommendation" data-aos="zoom-in-right">
            <div className="recommendation help">
              <div className="recommendation-img img3"></div>
              <Link to="#">EXTRAS</Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
}

export default Homepage
