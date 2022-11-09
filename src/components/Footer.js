import { Component } from "react";
import TasksFilter from "./TasksFilter";

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="todo-count">
                    {this.props.data.filter((task) => !task.completed).length}{" "}
                    items left
                </span>
                <TasksFilter
                    filter={this.props.filter}
                    onChangeFilter={this.props.onChangeFilter}
                />
                <button
                    className="clear-completed"
                    onClick={this.props.onClearCompleted}
                >
                    Clear completed
                </button>
            </footer>
        );
    }
}
