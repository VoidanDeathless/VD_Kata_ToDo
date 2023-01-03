import { useState } from 'react';

import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Footer from './Footer';

export default function App() {
  const [data, setData] = useState([
    {
      id: 1,
      editing: false,
      completed: true,
      description: 'fw',
      timer: 0,
      created: new Date(),
    },
    {
      id: 2,
      editing: true,
      completed: true,
      description: 'fw',
      timer: 0,
      created: new Date(),
    },
    {
      id: 3,
      editing: false,
      completed: false,
      description: 'fw',
      timer: 0,
      created: new Date(),
    },
  ]);
  const [filter, setFilter] = useState('All');

  const toggleCompleted = (id) =>
    setData((state) =>
      state.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return {
          ...task,
        };
      })
    );

  const getNewId = () => data.reduce((maxId, item) => (maxId < item.id ? item.id : maxId), 0) + 1;

  const addTask = (task) =>
    setData((state) => [
      ...state,
      {
        id: getNewId(),
        editing: false,
        completed: false,
        description: task.description,
        timer: task.min * 60 + task.sec,
        created: new Date(),
      },
    ]);

  const deleteTask = (id) => setData((state) => state.filter((task) => task.id !== id));

  const changeFilter = (selectedFilter) => setFilter(selectedFilter);

  const changeDescription = (id, newDescription) =>
    setData((state) =>
      state.map((task) => ({
        ...task,
        editing: !task.id === id,
        description: task.id === id ? newDescription : task.description,
      }))
    );

  const editDescription = (id) =>
    setData((state) =>
      state.map((task) => ({
        ...task,
        editing: task.id === id,
      }))
    );

  const clearCompleted = () => setData((state) => state.filter((task) => !task.completed));

  const countdown = (id) =>
    setData((state) =>
      state.map((task) => ({
        ...task,
        timer: task.id === id && task.timer > 0 ? task.timer - 1 : task.timer,
      }))
    );

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          data={data}
          filter={filter}
          onDeleteTask={deleteTask}
          onToggleCompleted={toggleCompleted}
          onEditDescription={editDescription}
          onChangeDescription={changeDescription}
          onCountdown={countdown}
        />
        <Footer data={data} filter={filter} onChangeFilter={changeFilter} onClearCompleted={clearCompleted} />
      </section>
    </section>
  );
}
