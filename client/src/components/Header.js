import React from 'react'
import HeaderLogo from './images/logo1.png'
import PGDLogo from './images/pgdcoep.PNG'
import './Header.css'

const Header = () => {
  return (
    <div className='header-container'>
        <div className="header-container2">
            <img src={HeaderLogo} alt="" id="logo1"/>
            <img src={PGDLogo} alt="" id="logo2"/>
        </div>
    </div>
  )
}

export default Header