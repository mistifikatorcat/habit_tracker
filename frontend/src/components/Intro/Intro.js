import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './intro.css'


function Intro({isLoggedIn, onLoginClick}){

    const navigate = useNavigate();

    function pushToDashboard(){
        navigate('/dashboard')
    }
    return(
        <section className='intro'>
            <h1 className='intro__title'>Hey, there!</h1>
            <div className='intro__text-wrapper'>
                <p className='intro__text' id='line1'>Have you ever wanted to try something new?</p>
                <p className='intro__text' id='line2'>We all've been there... </p>
                <p className='intro__text' id='line3'>You start it, maybe try couple days, and then abandon it...</p>
                <p className='intro__text' id='line4'>The thing is, it's pretty easy to start, but can you keep up the pace?</p>
                <p className='intro__text' id='line5'>It is believed that a habit forms in 66 days.</p>
                <p className='intro__text' id='line6'>So, I've designed an app to keep track of my own habits, hoping it will help me to focus on my skills as a developer. </p>
                <p className='intro__text' id='line7'>If you read this message, it means that I've succeeded in my goal. Hope, you will success in yours!</p>
            </div>
            {isLoggedIn
            ? (
                <button className='intro__link' onClick={pushToDashboard}>To the Dashboard</button>
            )
            :(
                <button className='intro__link' onClick={onLoginClick}>To the Dashboard</button>
            )
            }
             {/* if not logged in open login form */}
        </section>
    )
}

export default Intro;