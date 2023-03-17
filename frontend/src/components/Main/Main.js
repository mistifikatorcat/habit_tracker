import React from "react";
import Intro from "../Intro/Intro";
import Signup from "../Signup/Signup";


function Main({handleSignup, onLoginClick, onClose}){
    return(
        <main className="main">
            <Intro />
            <Signup handleSignup={handleSignup} onLoginClick={onLoginClick} onClose={onClose}/>
        </main>
    )
}

export default Main;