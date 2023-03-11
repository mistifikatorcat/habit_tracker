import React from "react";

import './navigation.css';

function Navigation(){



    return(
        <nav className="navi">
            <div className="navi__links">
                <button to='/signin' className="navi__button navi__login">
                    Sign in
                </button>
            </div>
        </nav>
    )
}


export default Navigation;