import { Component } from "react";
import PropTypes from 'prop-types';
import { formatDistanceToNow } from "date-fns";

export default class Task extends Component {
    
    static propTypes = {
        task: PropTypes.object.isRequired,
        onDeleteTask: PropTypes.func.isRequired,
        onToggleCompleted: PropTypes.func.isRequired,
        onEditDescription: PropTypes.func.isRequired,
    }
    
    state = {
        time: formatDistanceToNow(this.props.task.created, {
            includeSeconds: true,
        }),
    };

    componentDidMount() {
        this.timer = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({
            time: formatDistanceToNow(this.props.task.created, {
                includeSeconds: true,
            }),
        });
    }

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
                    <span className="created">{`created ${this.state.time} ago`}</span>
                </label>
                <button
                    className="icon icon-edit"
                    onClick={this.props.onEditDescription}
                ></button>
                <button
                    className="icon icon-destroy"
                    onClick={this.props.onDeleteTask}
                ></button>
            </div>
        );
    }
}
