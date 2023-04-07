import React from "react";
import './card.css';

function Card({habit, title, description, keyword, date, id}){



    const [cardRender, setCardRender] = React.useState({})


    React.useEffect(() => {
        setCardRender({
            title: habit.title,
            description: habit.description,
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

    const countDays = () => {
            const now = new Date();
            const habitDate = new Date(habit.createdAt);
            const diffTime = Math.abs(now - habitDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            return diffDays;
          };

    const changeHabitStatus = () => {
        let status;
        let className;
    switch (true) {
      case (countDays() < 7):
        status = ' new ';
        className = 'habit__status_first';
        break;
      case (countDays() < 21):
        status = ' feeling the water ';
        className = 'habit__status_second';

      break;
      case (countDays() < 40):
        status = ' forming ';
        className = 'habit__status_third';
        break;

        case (countDays() < 66):
          status = ' almost there ';
        className = 'habit__status_fourth';

          break; 
          
        default:
          status = 'completed'  
        className = 'habit__status_fifth';
    }

    return [status, className];
    }
    
    const [status, className] = changeHabitStatus();

    return(
        <li className="grid__habit">
            <div className="habit">
                <div className="habit__container">
                    <div className="habit__header">
                        <h3 className="habit__title">{title}</h3>
                        <div className="habit__buttons">
                            <button className="habit__edit"></button>
                            <button className="habit__delete"></button>
                        </div>
                    </div>
                    <p className="habit__date">{getDate()}</p>
                    <div className="habit__text">
                        <p className="habit__description">{description}</p>    
                        <p className="habit__keyword">{keyword}</p>
                        <p className="habit__test">{`days passed ${countDays()}`}</p>
                    </div>
                    <div className="habit__footer">
                        <p className={`habit__status ${className}`}>{status}</p>
                    </div>
                </div>
               

            </div>
        </li>
    )

}



export default Card;