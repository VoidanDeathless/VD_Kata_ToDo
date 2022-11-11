import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  static propTypes = {
    onAddTask: PropTypes.func.isRequired,
  };

  state = {
    newTask: '',
  };

  onInput = (event) => {
    this.setState({
      newTask: event.target.value,
    });
  };

  onEnter = (event) => {
    event.preventDefault();
    this.props.onAddTask(this.state.newTask);
    this.setState({
      newTask: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onEnter}>
        <input
          className="new-todo"
          onChange={this.onInput}
          value={this.state.newTask}
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}
