import { useState } from 'react';
import PropTypes from 'prop-types';

function NewTaskForm({ onAddTask }) {
  const [description, setDescription] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onInput = (event) => {
    setDescription(event.target.value);
  };

  const onInputMin = (event) => {
    setMin(+event.target.value);
  };

  const onInputSec = (event) => {
    setSec(+event.target.value);
  };

  const onEnter = (event) => {
    event.preventDefault();
    onAddTask({
      description,
      min,
      sec,
    });
    setDescription('');
    setMin('');
    setSec('');
  };

  return (
    <form className="new-todo-form" onSubmit={onEnter}>
      <input className="new-todo" onChange={onInput} value={description} placeholder="What needs to be done?" />
      <input
        type="number"
        min={0}
        className="new-todo-form__timer"
        onChange={onInputMin}
        value={min}
        placeholder="Min"
      />
      <input
        type="number"
        min={0}
        className="new-todo-form__timer"
        onChange={onInputSec}
        value={sec}
        placeholder="Sec"
      />
      <input type="submit" hidden />
    </form>
  );
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
