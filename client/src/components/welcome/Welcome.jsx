import React, { useEffect } from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import './welcome.css'

function Welcome() {
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
      }, [])

    return (
        <div className='welcome-page'>
            <Header />
            <div className="welcome">
                <h1 className="welcome-text">From The Principal</h1>
                <div className="s-h"></div>
            </div>
            <div className="welcome-image"></div>
            <div className="club-text">
                <p><span className='first-text'>I</span>t's  with a heart full of Gratitude that I welcome you all to this great Institute. It is a home for all. For all who want Progress, Discipline and eventually Success. May God bless Us all.</p>
                <small>Mr. Adamu daura</small>
            </div>
            <Footer />
        </div>
    )
}

export default Welcome
