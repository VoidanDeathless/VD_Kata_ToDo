import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useState } from 'react';

import Task from './Task';

function TaskList({
  data,
  onDeleteTask,
  onToggleCompleted,
  onEditDescription,
  onChangeDescription,
  onCountdown,
  filter = 'All',
}) {
  const [taskDescription, setTaskDescription] = useState('');

  const onInput = (event) => {
    setTaskDescription(event.target.value);
  };

  const onEnter = (event, id) => {
    event.preventDefault();
    onChangeDescription(id, taskDescription);
  };

  const onFilter = (task, selectedFilter) => {
    switch (selectedFilter) {
      case 'All':
        return false;
      case 'Active':
        return task.completed;
      case 'Completed':
        return !task.completed;
      default:
        return true;
    }
  };

  const tasks = data.map((task) => (
    <li
      key={task.id}
      className={classnames({
        completed: task.completed,
        editing: task.editing,
      })}
      hidden={onFilter(task, filter)}
    >
      <Task
        task={task}
        onDeleteTask={() => onDeleteTask(task.id)}
        onToggleCompleted={() => onToggleCompleted(task.id)}
        onEditDescription={() => onEditDescription(task.id)}
        onCountdown={() => onCountdown(task.id)}
      />
      <form onSubmit={(event) => onEnter(event, task.id)} onBlur={(event) => onEnter(event, task.id)}>
        <input type="text" className="edit" defaultValue={task.description} onChange={onInput} onFocus={onInput} />
      </form>
    </li>
  ));
  return <ul className="todo-list">{tasks}</ul>;
}

TaskList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
  onDeleteTask: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onEditDescription: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onCountdown: PropTypes.func.isRequired,
};

export default TaskList;
