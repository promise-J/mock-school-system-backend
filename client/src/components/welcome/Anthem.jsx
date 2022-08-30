import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';

const Anthem = () => {
    return <div className='welcome-page'>
        <Header />
        <div className="welcome">
            <h1 className="welcome-text">Our School Anthem</h1>
            <div className="s-h"></div>
        </div>
        <div className="club-text">
            <p style={{fontFamily: 'Noto Serif Display', fontWeight: 600}}><span className='first-text'>O</span>ne  of the greatest things that happened to my life is that i belong to Resonance ACADEMY
            to make them a heart beat of the nation is my dream I will surely never let you down.
            Ooooh! My alma mata, Ohhhh! my alma mata, to make you the heart beat of the nation is my dream I will surely never let you down, I will never let you down.</p>
            {/* <small>Resonance voices</small> */}
        </div>
        <Footer />
    </div>
};

export default Anthem;
