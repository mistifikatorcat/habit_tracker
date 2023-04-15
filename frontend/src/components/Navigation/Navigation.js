import React from "react";

import './navigation.css';

function Navigation({onLoginClick, username, isLoggedIn, onLogout, onClose, onRegisterClick}){

    // const handleLoginClick = () => {
    //     onClose();
    //     onLoginClick();
    //   };
    
    //   const handleRegisterClick = () => {
    //     onClose();
    //     onRegisterClick();
    //   };

    return(
        <nav className="navi">
            <div className="navi__links">
                {isLoggedIn ? (
                    <button className="navi__button navi__logout" onClick={onLogout}>
                        {username}
                    </button>
                ) : (
                    <button className="navi__button navi__login" to='/signin' onClick={onLoginClick}>
                    Sign in
                </button>
                )}
            </div>
        </nav>
    )
}


export default Navigation;