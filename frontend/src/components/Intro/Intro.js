import React from 'react';



function Intro(){
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
        </section>
    )
}

export default Intro;