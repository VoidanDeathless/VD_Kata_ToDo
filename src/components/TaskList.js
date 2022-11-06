import Task from "./Task";

export default function TaskList({ todos, onCompleted, onDelete }) {
    const tasks = todos.data.map(({ id, status, ...task }) => {
        return (
            <li key={id} className={status}>
                <Task {...task} onCompleted={() => onCompleted(id)} onDelete={() => onDelete(id)}/>
                <input
                    type="text"
                    className="edit"
                    defaultValue={task.description}
                ></input>
            </li>
        );
    });

    return <ul className="todo-list">{tasks}</ul>;
}
