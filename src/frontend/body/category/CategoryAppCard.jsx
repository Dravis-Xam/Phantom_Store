import React from 'react'
import { IoMdDownload } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { useCheckApp } from '../../../CheckAppContext';

export default function CategoryAppCard( {app} ) {
  const { showCheckApp } = useCheckApp();
  return (
    <div className='category-app-card' onClick={() => showCheckApp(app)}>
      <div className='category-app-detail'>
        <img src={app.icon} alt="..." />
        <div className='category-app-desc'>
            <b className='category-app-title'>{app.title}</b><br />
            <div className='app-desc'>
              <small><IoMdDownload /><img src="" alt="" /><span>{app.downloads}M</span></small>
              <span className='separator'>.</span>
              <small><CiStar /><img src="" alt="" /><span>{app.rating}</span></small>
            </div>
        </div>
      </div>
      <button className='get-app-button' onClick={() => showCheckApp(app)}>Get</button>
    </div>
  )
}




