import React from "react";

import Card from "../Card/Card";

function Grid({cardsArray}){


    return(
        <section className="grid">
           <ul className="grid__habits">
            {cardsArray && cardsArray.map((habit) => 
                (
                    <Card 
                        key={habit._id}
                        habit={habit}
                        title={habit.title}
                        description={habit.description}
                        keyword={habit.keyword}
                        status={habit.status}
                        date={habit.date}
                    />
                )
            )}
           </ul>
        </section>
    )
}

export default Grid;