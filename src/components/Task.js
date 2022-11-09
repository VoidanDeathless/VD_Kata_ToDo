import { Component } from "react";

export default class Task extends Component {
    render() {
        return (
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={this.props.task.completed}
                    onChange={this.props.onToggleCompleted}
                />
                <label>
                    <span className="description">
                        {this.props.task.description}
                    </span>
                    <span className="created">{this.props.task.created}</span>
                </label>
                <button className="icon icon-edit"></button>
                <button
                    className="icon icon-destroy"
                    onClick={this.props.onDeleteTask}
                ></button>
            </div>
        );
    }
}
