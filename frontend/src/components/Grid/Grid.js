import React from "react";

import Card from "../Card/Card";

function Grid({habits}){


    return(
        <section className="grid">
           <ul className="grid__habits">
            {habits && habits.map((card) => {
                (
                    <Card 
                        key={card._id}
                        habit={card}
                        title={card.title}
                        description={card.description}
                        keyword={card.keyword}
                        status={card.status}
                        date={card.date}
                    />
                )
            })}
           </ul>
        </section>
    )
}

export default Grid;