//Author: Jani Niittymäki
//4.6.2019
import React from "react";
import TaskItem from "./TaskItem"

class TaskItems extends React.Component {

    // Render the taskList
    render() {
        const taskList = this.props.taskList.map((task) => {
            return (
                <TaskItem
                    key={task.index}
                    task={task}
                    taskClicked ={this.props.taskClicked}
                />)


        });

        return <div>{taskList}</div>;
    }

}


export default TaskItems