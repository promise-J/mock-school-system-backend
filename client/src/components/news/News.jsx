import React from 'react'
import Img1 from '../../images/image.jpg'
import './news.css'

function News() {
    return (
        <div className="news-card">
            <div className="news-card-inner">
                <img src={Img1} alt="" />
                <h2>Application For 2020/2021 Academic Session Now Open</h2>
                <span className="date">19th, August, 2020.</span>
                <p>The school for the gifted and talented is inviting students to apply for the 2020/2021 academic
                    session starting in September.Download the form by clicking on the link above.</p>
            </div>
        </div>
    )
}

export default News
