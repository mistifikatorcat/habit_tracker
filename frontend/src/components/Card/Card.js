import React from "react";

function Card({habit, title, description, keyword, status, date, id}){



    const [cardRender, setCardRender] = React.useState({})


    React.useEffect(() => {
        setCardRender({
            title: habit.title,
            description: habit.description,
            status: habit.status,
            keyword: habit.keyword,
            date: habit.createdAt,
            id: habit._id
        })
    }, [])

    const getDate = () => {
			const habitDate = new Date(habit.createdAt);

			const months = [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec',
			];
			const month = months[habitDate.getMonth()];
			const day = habitDate.getDay();
			const year = habitDate.getFullYear();
			const fullDate = month + ' ' + day + ', ' + year;
			return fullDate;
	};

    return(
        <li className="grid__habit">
            <div className="habit">
                <div className="habit__container">
                    <h3 className="habit__title">{title}</h3>
                    <button className="habit__edit"></button>
                    <button className="habit__delete"></button>
                    <p className="habit__test">{getDate()}</p>
                    <div className="habit__text">
                        <p className="habit__test">{description}</p>    
                        <p className="habit__test">{keyword}</p>
                    </div>
                    <div className="habit__footer">
                        <p className="habit__test">{status}</p>
                    </div>
                </div>
               

            </div>
        </li>
    )

}



export default Card;