import { Component } from "react";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";
import Footer from "./Footer";

export default class App extends Component {
    state = {
        data: [
            {
                id: 1,
                editing: false,
                completed: true,
                description: "Completed task",
                created: new Date(),
            },
            {
                id: 2,
                editing: true,
                completed: true,
                description: "Editing task",
                created: new Date(),
            },
            {
                id: 3,
                editing: false,
                completed: false,
                description: "Active task",
                created: new Date(),
            },
        ],
        // filter: "All",
    };

    toggleCompleted = (id) => {
        this.setState({
            data: this.state.data.map((task) => {
                if (task.id === id)
                    return { ...task, completed: !task.completed };
                return { ...task };
            }),
        });
    };

    getNewId = (data) =>
        data.reduce((maxId, data) => (maxId < data.id ? data.id : maxId), 0) +
        1;

    addTask = (task) => {
        this.setState({
            data: [
                ...this.state.data,
                {
                    id: this.getNewId(this.state.data),
                    editing: false,
                    completed: false,
                    description: task,
                    created: new Date(),
                },
            ],
        });
    };

    deleteTask = (id) =>
        this.setState({
            data: this.state.data.filter((task) => task.id !== id),
        });

    changeFilter = (filter) =>
        this.setState({
            filter: filter,
        });

    changeDescription = (id, newDescription) =>
        this.setState({
            data: this.state.data.map((task) => ({
                ...task,
                // editing: task.id === id ? false : task.editing,
                editing: !task.id === id,
                description: task.id === id ? newDescription : task.description,
            })),
        });

    editDescription = (id) =>
        this.setState({
            data: this.state.data.map((task) => ({
                ...task,
                // editing: task.id === id ? true : task.editing,
                editing: task.id === id,
            })),
        });

    clearCompleted = () =>
        this.setState({
            data: this.state.data.filter((task) => !task.completed),
        });

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
