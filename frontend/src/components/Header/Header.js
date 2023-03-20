import React from 'react';

import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import './header.css'

function Header ({isLoggedIn, username, onLoginClick, onLogout, onClose, onRegisterClick}){

    return(
        <header className='header'>
            <div className='header__nav-wrapper'>
                <div className='header__logo-wrapper'>
                    <img className='header__logo' alt="Habit Tracker" src={logo}/>
                </div>
                <Navigation
                username={username}
                isLoggedIn={isLoggedIn}
                onLoginClick={onLoginClick}
                onClose={onClose}
                onRegisterClick={onRegisterClick}
                onLogout={onLogout} />
            </div>
        </header>
    )
}

export default Header;