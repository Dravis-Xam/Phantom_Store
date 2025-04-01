import React from 'react';
import { CiStar } from "react-icons/ci";
import { IoMdDownload } from "react-icons/io";
import { useCheckApp } from '../../../CheckAppContext';


export default function SliderCard({ o }) {
    const { showCheckApp } = useCheckApp();
    return (
        <div className='slider-card'>
            <div className="slider-card-content">
                <img src={o.icon} alt="App Icon" className="app-icon" />
                <div className="app-details">
                    <div className="app-name"><b>{o.title}</b></div>
                    <div className="app-stats">
                        <small className="rating-icon"><CiStar /></small>
                        <small>{o.rating} </small>
                        <small className="separator">.</small>
                        <small><IoMdDownload /></small>
                        <small className="downloads">{o.downloads}m</small>
                    </div>
                </div>
                <button className="download-button" onClick={() => showCheckApp(app)}>
                    Download
                </button>
            </div>
        </div>
    );
}