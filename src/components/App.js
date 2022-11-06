import { Component } from "react";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";
import Footer from "./Footer";
import { formatDistanceToNow } from "date-fns";

export default class App extends Component {
    state = {
        data: [
            {
                id: 1,
                status: "completed",
                description: "Completed task",
                created: `created ${formatDistanceToNow(new Date())} ago`,
            },
            {
                id: 2,
                status: "editing",
                description: "Editing task",
                created: `created ${formatDistanceToNow(new Date())} ago`,
            },
            {
                id: 3,
                status: "",
                description: "Active task",
                created: `created ${formatDistanceToNow(new Date())} ago`,
            },
        ],
    };

    changeStatus = (id) =>
        this.setState({
            data: this.state.data.map((e) => {
                if (e.id === id && e.status === "")
                    return { ...e, status: "completed" };
                if (e.id === id && e.status === "completed")
                    return { ...e, status: "" };
                return { ...e };
            }),
        });

    deleteTask = (id) =>
        this.setState({
            data: this.state.data.filter((e) => e.id !== id),
        });

    render() {
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm />
                </header>
                <section className="main">
                    <TaskList
                        todos={this.state}
                        onCompleted={this.changeStatus}
                        onDelete={this.deleteTask}
                    />
                    <Footer />
                </section>
            </section>
        );
    }
}
