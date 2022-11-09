import { Component } from "react";
import Task from "./Task";

export default class TaskList extends Component {
    getStatus = (task) =>
        `${task.completed ? "completed" : ""} ${task.editing ? "editing" : ""}`;

    render() {
        const tasks = this.props.data
            .filter((task) => {
                if (this.props.filter === "All") return true;
                if (this.props.filter === "Active") return !task.completed;
                if (this.props.filter === "Completed") return task.completed;
                return false;
            })
            .map((task) => (
                <li key={task.id} className={this.getStatus(task)}>
                    <Task
                        task={task}
                        onDeleteTask={() => this.props.onDeleteTask(task.id)}
                        onToggleCompleted={() =>
                            this.props.onToggleCompleted(task.id)
                        }
                    />
                    <form>
                        <input
                            type="text"
                            className="edit"
                            defaultValue={task.description}
                        ></input>
                    </form>
                </li>
            ));
        return <ul className="todo-list">{tasks}</ul>;
    }
}
