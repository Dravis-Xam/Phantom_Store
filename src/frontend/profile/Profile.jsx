import React from 'react'
import { FaHistory } from "react-icons/fa"
import { IoLibrary } from "react-icons/io5"
import { IoIosLogOut } from "react-icons/io"
import { MdOutlineAccountCircle } from "react-icons/md"
import { FaExchangeAlt } from "react-icons/fa"
import { MdOutlinePassword } from "react-icons/md"
import { IoMdClose } from "react-icons/io";

export default function Profile() {
  return (
    <div className='profile-icon-container'>
      <button className='profile-btn'><MdOutlineAccountCircle /></button>
      Hi, Ken
      <div className='profile-container'>
        <button className='profileCloseBtn'><IoMdClose /></button>
        <img src='' alt='...'></img>
        <h3>Guest</h3>
        <ul className='profile-options'>
            <li className='profile-option-container'>
                <button><FaHistory /><span>History</span></button>
            </li>
            <li className='profile-option-container'>
                <button><FaExchangeAlt /><span>Change email</span></button>
            </li>
            <li className='profile-option-container'>
                <button><MdOutlinePassword /><span>Change password</span></button>
            </li>
            <li className='profile-option-container'>
                <button><FaHistory /><span>Bind</span></button>
            </li>
            <li className='profile-option-container'>
                <button><IoLibrary /><span>Library</span></button>
            </li>
            <li className='profile-option-container'>
                <button><IoIosLogOut /><span>Log out</span></button>
            </li>
        </ul>
      </div>
    </div>
  )
}
