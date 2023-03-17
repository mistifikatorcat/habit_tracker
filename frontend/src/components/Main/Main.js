import React from "react";
import Intro from "../Intro/Intro";
import Signup from "../Signup/Signup";


function Main({handleSignup}){
    return(
        <main className="main">
            <Intro />
            <Signup handleSignup={handleSignup}/>
        </main>
    )
}

export default Main;