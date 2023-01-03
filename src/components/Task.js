import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

function Task({ task, onDeleteTask, onToggleCompleted, onEditDescription, onCountdown }) {
  const [createdTime, setCreatedTime] = useState(
    formatDistanceToNow(task.created, {
      includeSeconds: true,
    })
  );
  const [isCountdown, setIsCountdown] = useState(true);

  let timer;

  const tick = () => {
    setCreatedTime(
      formatDistanceToNow(task.created, {
        includeSeconds: true,
      })
    );
  };

  useEffect(() => {
    const ticker = setInterval(() => tick(), 1000);
    return () => clearInterval(ticker);
  }, []);

  useEffect(() => {
    if (isCountdown) timer = setInterval(() => onCountdown(), 1000);
    if (!isCountdown) clearInterval(timer);
    return () => clearInterval(timer);
  }, [isCountdown]);

  const startTimer = () => setIsCountdown(true);

  const stopTimer = () => setIsCountdown(false);

  const toggleTimer = () => {
    onToggleCompleted();
    if (!task.completed) stopTimer();
    if (task.completed) startTimer();
  };

  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={task.completed} onChange={() => toggleTimer()} />
      <div className="label">
        <span className="description">{task.description}</span>
        <span className="timer">
          <button type="button" className="icon icon-play" onClick={() => startTimer()} aria-label="Play" />
          <button type="button" className="icon icon-pause" onClick={() => stopTimer()} aria-label="Pause" />
          {` ${Math.floor(task.timer / 60)}:${task.timer % 60}`}
        </span>
        <span className="created">{`created ${createdTime} ago`}</span>
      </div>
      <button type="button" className="icon icon-edit" aria-label="Edit" onClick={onEditDescription} />
      <button type="button" className="icon icon-destroy" aria-label="Destroy" onClick={onDeleteTask} />
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onEditDescription: PropTypes.func.isRequired,
  onCountdown: PropTypes.func.isRequired,
};

export default Task;
