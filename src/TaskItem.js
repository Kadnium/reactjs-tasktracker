//Author: Jani Niittymäki
//4.6.2019
import React from "react"
import ActivityPopUp from "./ActivityPopUp";


class TaskItem extends React.Component {
    constructor(props){
        super(props);
        //current index
        this.index = this.props.task.index;
        // Name of the task
        this.taskName = this.props.task.taskName;
        // Index that keeps track of  amount to be used for the keys
        this.activityIndex = 0;
        // Current running activity
        this.currentActivity = null;
        // Timer id
        this.timer = null;
        this.state={
            activities: [],
            taskDuration: 0,
            activityPopUp: false,
            timerButtonState: "Start"

        }
    }
    // If task or back button is clicked, open or hide the activityScreen
    onClosePopUpClick = () => {
        this.setState({
                activityPopUp: !this.state.activityPopUp
            }
        );
        this.props.taskClicked(!this.state.activityPopUp);

    };


    // If the timer start button is clicked, start timer and create new activity
    onButtonClicked() {
        this.setState({timerButtonState: this.state.timerButtonState === "Start" ? "Stop" : "Start"});
        // If timer is running clear timer and end the activity
        if (this.timer != null) {
            clearInterval(this.timer);
            this.timer = null;
            this.currentActivity.endTime = this.getSystemTime();
            // If timer is not running, create a new activity and add it to the array
        } else {
            const newActivity = new Activity(this.activityIndex);
            newActivity.startTime = this.getSystemTime();
            this.setState(previousState => ({
                activities: previousState.activities.concat(newActivity),
            }));
            this.currentActivity =newActivity;
            this.timer = setInterval(this.updateTimers, 1000);
            this.activityIndex++
        }
    }
    // Update the values keeping track of time
    updateTimers = () => {
        this.currentActivity.activityDuration+=1;
        this.setState({
            taskDuration: this.state.taskDuration+1}
        );



    };
    // Add 0's if value is under 10
    timeCalc(time){
        return time < 10 ? "0" + time : time;
    }

    // Get the current system time
    getSystemTime() {
        const currentDate = new Date();
        return (
            this.timeCalc(currentDate.getHours()) +
            ":" +
            this.timeCalc(currentDate.getMinutes()) +
            ":" +
            this.timeCalc(currentDate.getSeconds())
        );

    }

    // Format time to mm:ss
    secondMinuteSplitter = (seconds) => {
        let minutes = Math.floor(seconds / 60);
        let secondRemaining = seconds % 60;
        secondRemaining = this.timeCalc(secondRemaining);
        minutes = this.timeCalc(minutes);



        return minutes + ":" + secondRemaining;

    };

    // Render the activities if task is clicked
    render() {
        const currentDuration = this.secondMinuteSplitter(this.state.taskDuration);
        return (
            <div>
                {this.state.activityPopUp ?
                    <ActivityPopUp
                        activities={this.state.activities}
                        closePopUp={() => this.onClosePopUpClick()}
                        secondMinute={(value) => this.secondMinuteSplitter(value)}
                        onButtonClicked={() =>this.onButtonClicked()}
                        currentTime={currentDuration}
                        timerButtonState={this.state.timerButtonState}
                    /> :
                    <div className="ui huge celled list" onClick={(() => this.onClosePopUpClick())}>
                        <div className="item">
                            <div className="content">
                                <div className="header">{this.taskName}</div>
                                Duration: {currentDuration}
                            </div>
                        </div>
                    </div>

                }
            </div>
                )
    }
}

class Activity {

    constructor(index) {
        // Index of this activity
        this.index = index;
        // Duration, start time and end time of this activity
        this.activityDuration = 0;
        this.startTime = null;
        this.endTime = "-";

    }


}
export default TaskItem;