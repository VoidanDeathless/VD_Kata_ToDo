import Task from "./Task";

export default function TaskList({ todos }) {
    const tasks = todos.map(({ id, status, ...task }) => {
        console.log(task);
        return (
            <li key={id} className={status}>
                <Task {...task} />
                <input
                    type="text"
                    className="edit"
                    value="Editing task"
                ></input>
            </li>
        );
    });

    return <ul className="todo-list">{tasks}</ul>;
}
