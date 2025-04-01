import React from 'react'
import Dir from './dir/Dir'
import Slider from './slider/slider'
import Category from './category/Category'
import GoToTop from './GoToTop';
import './body.css';

export default function Body() {
    let categories = ['Games',"Social","Music","PC apps"];
  return (
    <div className='body'>
      <Dir />
      <h3 className='catch-line'>Find any apps or games you want easy and free.</h3>
      <Slider />
      {categories.map((category) => (
        <Category key={category} category={category} />
      ))}
      <GoToTop />
    </div>
  )
}
