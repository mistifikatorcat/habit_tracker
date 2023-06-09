import React from "react";
import "./main.css";
import Grid from "../Grid/Grid";

function Main({
  username,
  cardsArray,
  onHabitClick,
  onEditClick,
  onDeleteClick,
}) {
  return (
    <main className="dashboard">
      <div className="dashboard__header">
        <h2 className="dashboard__header-text">Welcome back, {username}!</h2>
        <button className="dashboard__button" onClick={onHabitClick}>
          Add a new habit
        </button>
      </div>
      <Grid
        cardsArray={cardsArray}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
    </main>
  );
}

export default Main;
