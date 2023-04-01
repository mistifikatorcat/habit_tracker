import React from "react";

import Grid from '../Grid/Grid';


function Main({username, habits, onHabitClick}){

    return(
        <main className="dashboard">
            <h2 className="dashboard__header">
                Welcome back, {username}!
            </h2>
            <Grid 
                habits={habits}
            />
            <button className="dashboard__button" onClick={onHabitClick}>Add a new habit</button>
        </main>
    )
}


export default Main;