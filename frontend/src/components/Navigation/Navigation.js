import React from "react";

import './navigation.css';

function Navigation({onLoginClick, onClose, onRegisterClick}){

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
                <button to='/signin' className="navi__button navi__login" onClick={onLoginClick}>
                    Sign in
                </button>
            </div>
        </nav>
    )
}


export default Navigation;