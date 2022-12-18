import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  static propTypes = {
    onAddTask: PropTypes.func.isRequired,
  };

  state = {
    newTask: {
      description: '',
      min: '',
      sec: '',
    },
  };

  onInput = (event) => {
    this.setState((state) => ({
      newTask: {
        ...state.newTask,
        description: event.target.value,
      },
    }));
  };

  onInputMin = (event) => {
    this.setState((state) => ({
      newTask: {
        ...state.newTask,
        min: +event.target.value,
      },
    }));
  };

  onInputSec = (event) => {
    this.setState((state) => ({
      newTask: {
        ...state.newTask,
        sec: +event.target.value,
      },
    }));
  };

  onEnter = (event) => {
    event.preventDefault();
    this.props.onAddTask(this.state.newTask);
    this.setState({
      newTask: {
        description: '',
        min: '',
        sec: '',
      },
    });
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onEnter}>
        <input
          className="new-todo"
          onChange={this.onInput}
          value={this.state.newTask.description}
          placeholder="What needs to be done?"
        />
        <input
          type="number"
          min={0}
          className="new-todo-form__timer"
          onChange={this.onInputMin}
          value={this.state.newTask.min}
          placeholder="Min"
        />
        <input
          type="number"
          min={0}
          className="new-todo-form__timer"
          onChange={this.onInputSec}
          value={this.state.newTask.sec}
          placeholder="Sec"
        />
        <input type="submit" hidden />
      </form>
    );
  }
}
