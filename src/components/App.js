import { Component } from 'react';

import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Footer from './Footer';

export default class App extends Component {
  state = {
    data: [
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
    ],
    // filter: "All",
  };

  toggleCompleted = (id) => {
    this.setState((state) => ({
      data: state.data.map((task) => {
        if (task.id === id) return { ...task, completed: !task.completed };
        return { ...task };
      }),
    }));
  };

  getNewId = () => this.state.data.reduce((maxId, data) => (maxId < data.id ? data.id : maxId), 0) + 1;

  addTask = (task) => {
    this.setState((state) => ({
      data: [
        ...state.data,
        {
          id: this.getNewId(),
          editing: false,
          completed: false,
          description: task.description,
          timer: task.min * 60 + task.sec,
          created: new Date(),
        },
      ],
    }));
  };

  deleteTask = (id) =>
    this.setState((state) => ({
      data: state.data.filter((task) => task.id !== id),
    }));

  changeFilter = (filter) =>
    this.setState({
      filter,
    });

  changeDescription = (id, newDescription) =>
    this.setState((state) => ({
      data: state.data.map((task) => ({
        ...task,
        editing: !task.id === id,
        description: task.id === id ? newDescription : task.description,
      })),
    }));

  editDescription = (id) =>
    this.setState((state) => ({
      data: state.data.map((task) => ({
        ...task,
        editing: task.id === id,
      })),
    }));

  clearCompleted = () =>
    this.setState((state) => ({
      data: state.data.filter((task) => !task.completed),
    }));

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            data={this.state.data}
            filter={this.state.filter}
            onDeleteTask={this.deleteTask}
            onToggleCompleted={this.toggleCompleted}
            onEditDescription={this.editDescription}
            onChangeDescription={this.changeDescription}
          />
          <Footer
            data={this.state.data}
            filter={this.state.filter}
            onChangeFilter={this.changeFilter}
            onClearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
