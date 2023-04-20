import React from "react";
import './main.css';
import Grid from '../Grid/Grid';


function Main({username, cardsArray, onHabitClick, onEditClick, onDeleteClick}){

    return(
        <main className="dashboard">
            <h2 className="dashboard__header">
                Welcome back, {username}!
            </h2>
            <Grid 
                cardsArray={cardsArray}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
            />
            <button className="dashboard__button" onClick={onHabitClick}>Add a new habit</button>
        </main>
    )
}


export default Main;