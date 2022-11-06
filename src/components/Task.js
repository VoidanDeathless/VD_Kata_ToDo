export default function Task({ description, created, onCompleted, onDelete }) {

    return (
        <div className="view">
            <input className="toggle" type="checkbox" onChange={onCompleted}/>
            <label>
                <span className="description">{description}</span>
                <span className="created">{created}</span>
            </label>
            <button className="icon icon-edit"></button>
            <button className="icon icon-destroy" onClick={onDelete}></button>
        </div>
    );
}
