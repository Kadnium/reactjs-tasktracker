//Author: Jani Niittymäki
//4.6.2019
import React from "react"
import ActivityForm from "./ActivityForm"

class ActivityPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // State of the timer button
            timerText: "Start"
        }
    }
    // If user clicks the timer button, start timer and change the button text
    timerButtonClicked = (e) => {
        e.preventDefault();
        this.props.onButtonClicked();

    };
    // Render the components containing activities of the task, timer and button
    render() {
        // Map the array of activities
        const activities = this.props.activities.map((activity) => {
            return (
                <div className="ui huge celled list" key={activity.index}>
                    <div className="item">
                        <div className="content">
                            <div className="header">{this.props.secondMinute(activity.activityDuration)} </div>
                            <div>
                                Start: {activity.startTime}<br/>
                                Stop: {activity.endTime}
                            </div>
                        </div>
                    </div>
                </div>)
        });

        return (
            <div className="main_screen_parent">
                <div className="main_screen">
                    <div className="ui_container">
                        <button onClick={this.props.closePopUp} className="ui left labeled icon button">
                            <i className="left arrow icon"></i>
                            Back
                        </button>
                        {activities}
                        <div className="input_container">
                            <ActivityForm
                                onTimerClick={this.timerButtonClicked}
                                timerValue={this.props.currentTime}
                                timerState={this.props.timerButtonState}
                            />
                        </div>
                    </div>

                </div>
            </div>


        );
    }
}


export default ActivityPopUp


