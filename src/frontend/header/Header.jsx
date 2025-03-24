import React from 'react'
import Nav from '../nav/Nav'
import Search from '../search/search'
import Profile from '../profile/Profile'
import logo from '../../assets/P.gif'
import './header.css'

export default function Header() {
  return (
    <div className='header'>
      <div style={{display: "flex", alignItems: 'center'}}>
        <img src={logo} alt="..."/>
        <h2 className='page-title'>Phantom Store</h2>
      </div>
      <Search />

     
        <Nav /><Profile />
      
    </div>
  )
}
