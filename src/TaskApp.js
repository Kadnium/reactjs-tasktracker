//Author: Jani Niittymäki
//4.6.2019
import React from "react";
import TaskForm from "./TaskForm"
import TaskItems from "./TaskItems"
// eslint-disable-next-line no-unused-vars
import "./TaskApp.css"


// Component that manages and creates the application
class TaskApp extends React.Component {
    inputRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            // Keep track of the task amount for the keys
            currentIndex: 0,
            // Store task objects
            tasks: [],
            // Handle the state of text input
            inputState: "",
            // Keep track of the activityscreen's state
            popUpOn: false
        }
    }


    // Add new Task to the array
    addTask = () => {
        if (this.state.inputState) {
            const newTask = new TaskObj(this.state.inputState, this.state.currentIndex);
            this.setState(previousState => ({
                tasks: previousState.tasks.concat(newTask),
                inputState: "",
                currentIndex: this.state.currentIndex + 1
            }));
        }


    };

    // On text input change, the text input value's state
    handleInputChange = (e) => {
        this.setState({inputState: e.target.value})
    };
    // If task is clicked set value of the activity screen to stop
    // TaskForm from rendering
    taskClicked = (bool) => {
        this.setState({popUpOn: bool})
    };


    // Render the components containing tasks and the button and input combo,
    // if user has clicked a task, show the activity screen instead
    render() {
        return (
            <div>
                <div className="main_screen_parent">
                    <div className="main_screen">
                        <div className="ui_container">
                            <TaskItems
                                taskList={this.state.tasks}
                                taskClicked={(bool) => this.taskClicked(bool)}
                            />
                            {this.state.popUpOn ? null :
                                <div className="input_container">
                                    <TaskForm
                                        onTaskAdd={this.addTask}
                                        inputState={this.state.inputState}
                                        onChange={(e) => this.handleInputChange(e)}
                                        inputRef={this.inputRef}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }


}

class TaskObj {
    constructor(taskName, index) {
        // Index of this task
        this.index = index;
        // Name of the task
        this.taskName = taskName;

    }


}


export default TaskApp