import React from 'react';

import logo from '../../images/logo.svg';

function Header (/*isLoggedIn, username, onLoginClick*/){

    return(
        <header className='header'>
            <div className='header__nav-wrapper'>
                <div className='header__logo-wrapper'>
                    <img className='header__logo' alt="Habit Tracker" src={logo}/>
                </div>
                {/* <Navigation /> */}
            </div>
        </header>
    )
}

export default Header;