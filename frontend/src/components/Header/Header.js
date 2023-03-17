import React from 'react';

import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import './header.css'

function Header (isLoggedIn, username, onLoginClick, onClose, onRegisterClick){

    return(
        <header className='header'>
            <div className='header__nav-wrapper'>
                <div className='header__logo-wrapper'>
                    <img className='header__logo' alt="Habit Tracker" src={logo}/>
                </div>
                <Navigation
                onLoginClick={onLoginClick}
                onClose={onClose}
                onRegisterClick={onRegisterClick} />
            </div>
        </header>
    )
}

export default Header;