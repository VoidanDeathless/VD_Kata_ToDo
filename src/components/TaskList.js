import { Component } from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

export default class TaskList extends Component {
  static defaultProps = {
    filter: 'All',
  };

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
    onDeleteTask: PropTypes.func.isRequired,
    onToggleCompleted: PropTypes.func.isRequired,
    onEditDescription: PropTypes.func.isRequired,
    onChangeDescription: PropTypes.func.isRequired,
  };

  state = {
    taskDescription: '',
  };

  onInput = (event) => {
    this.setState({
      taskDescription: event.target.value,
    });
  };

  onEnter = (event, id) => {
    event.preventDefault();
    this.props.onChangeDescription(id, this.state.taskDescription);
  };

  render() {
    const tasks = this.props.data
      .filter((task) => {
        switch (this.props.filter) {
          case 'All':
            return true;
          case 'Active':
            return !task.completed;
          case 'Completed':
            return task.completed;
          default:
            return false;
        }
      })
      .map((task) => (
        <li key={task.id} className={`${task.completed ? 'completed' : ''} ${task.editing ? 'editing' : ''}`}>
          <Task
            task={task}
            onDeleteTask={() => this.props.onDeleteTask(task.id)}
            onToggleCompleted={() => this.props.onToggleCompleted(task.id)}
            onEditDescription={() => this.props.onEditDescription(task.id)}
          />
          <form onSubmit={(event) => this.onEnter(event, task.id)} onBlur={(event) => this.onEnter(event, task.id)}>
            <input
              type="text"
              className="edit"
              defaultValue={task.description}
              onChange={this.onInput}
              onFocus={this.onInput}
            />
          </form>
        </li>
      ));
    return <ul className="todo-list">{tasks}</ul>;
  }
}
