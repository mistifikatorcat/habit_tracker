import React from "react";
import './grid.css';
import Card from "../Card/Card";

function Grid({cardsArray, onEditClick, onDeleteClick}){


    return(
        <section className="grid">
           <ul className="grid__habits">
            {cardsArray && cardsArray.map((habit) => 
                (
                    <Card 
                        key={habit._id}
                        id={habit._id}
                        habit={habit}
                        title={habit.title}
                        description={habit.description}
                        keyword={habit.keyword}
                        status={habit.status}
                        date={habit.date}
                        onEditClick={onEditClick}
                        onDeleteClick={onDeleteClick}
                    />
                )
            )}
           </ul>
        </section>
    )
}

export default Grid;