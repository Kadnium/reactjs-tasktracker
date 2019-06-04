//Author: Jani Niittymäki
//4.6.2019
import React from "react"


class TaskForm extends React.Component{
    // On for submit, add new task and focus the input bar
    onFormSubmit=(e)=>{
        e.preventDefault();
        this.props.onTaskAdd();
        this.props.inputRef.current.focus();
    };
    // Render the input and button for the task screen
    render(){
        return(
            <div className="header">
                <form onSubmit = {(e)=> this.onFormSubmit(e)}>
                    <input
                        placeholder="Add task..."
                        value={this.props.inputState}
                        onChange={this.props.onChange}
                        ref ={this.props.inputRef}
                    />
                    <button type="submit"> Add </button>
                </form>
            </div>
        )
    }
}
export default TaskForm