//Author: Jani Niittymäki
//4.6.2019
import React from "react"


const ActivityForm =(props)=>{
    // Render the timer and button for the activity screen
    return(
        <div className="header">
            <form onSubmit = {(e)=> props.onTimerClick(e)}>
                <input
                    value={props.timerValue}
                    readOnly={true}
                />
                <button type="submit"> {props.timerState}</button>
            </form>
        </div>
    )
};


export default ActivityForm