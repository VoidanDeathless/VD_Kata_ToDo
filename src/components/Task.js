import { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  static propTypes = {
    task: PropTypes.object.isRequired,
    onDeleteTask: PropTypes.func.isRequired,
    onToggleCompleted: PropTypes.func.isRequired,
    onEditDescription: PropTypes.func.isRequired,
  };

  state = {
    time: formatDistanceToNow(this.props.task.created, {
      includeSeconds: true,
    }),
    isCountdown: true,
  };

  componentDidMount() {
    this.ticker = setInterval(() => this.tick(), 1000);
    this.timer = setInterval(() => this.countdown(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.ticker);
    clearInterval(this.timer);
  }

  tick() {
    this.setState({
      time: formatDistanceToNow(this.props.task.created, {
        includeSeconds: true,
      }),
    });
  }

  countdown() {
    if (this.props.task.timer > 0) this.props.task.timer -= 1;
  }

  startTimer() {
    if (!this.state.isCountdown) {
      this.timer = setInterval(() => this.countdown(), 1000);
      this.setState({ isCountdown: true });
    }
  }

  stopTimer() {
    clearInterval(this.timer);
    this.setState({ isCountdown: false });
  }

  toggleTimer() {
    this.props.onToggleCompleted();
    if (!this.props.task.completed) this.stopTimer();
    if (this.props.task.completed) this.startTimer();
  }

  render() {
    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={this.props.task.completed}
          onChange={() => this.toggleTimer()}
        />
        <div className="label">
          <span className="description">{this.props.task.description}</span>
          <span className="timer">
            <button type="button" className="icon icon-play" onClick={() => this.startTimer()} aria-label="Play" />
            <button type="button" className="icon icon-pause" onClick={() => this.stopTimer()} aria-label="Pause" />
            {` ${Math.floor(this.props.task.timer / 60)}:${this.props.task.timer % 60}`}
          </span>
          <span className="created">{`created ${this.state.time} ago`}</span>
        </div>
        <button type="button" className="icon icon-edit" aria-label="Edit" onClick={this.props.onEditDescription} />
        <button type="button" className="icon icon-destroy" aria-label="Destroy" onClick={this.props.onDeleteTask} />
      </div>
    );
  }
}
