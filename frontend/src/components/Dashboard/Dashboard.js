import React from "react";

import Grid from '../Grid/Grid';


function Dashboard({username}){

    return(
        <section className="dashboard">
            <h2 className="dashboard__header">
                Welcome back, {username}!
            </h2>
            <Grid />
            <button className="dashboard__button">Add a new habit</button>
        </section>
    )
}


export default Dashboard;