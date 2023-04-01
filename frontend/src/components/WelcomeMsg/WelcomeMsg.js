import React from "react";
import Intro from "../Intro/Intro";
import Signup from "../Signup/Signup";


function WelcomeMsg({handleSignup, onLoginClick, isLoggedIn, onClose}){
    return(
        <main className="welcomeMsg">
            <Intro onLoginClick={onLoginClick} isLoggedIn={isLoggedIn} />
            <Signup handleSignup={handleSignup} onLoginClick={onLoginClick} onClose={onClose}/>
        </main>
    )
}

export default WelcomeMsg;