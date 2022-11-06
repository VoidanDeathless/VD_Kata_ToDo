import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";
import Footer from "./Footer";
import { formatDistanceToNow } from 'date-fns'

const data = [
    {id: 1, status: 'completed', description: 'Completed task', created: `created ${formatDistanceToNow(new Date())} ago`},
    {id: 2, status: 'editing', description: 'Editing task', created: `created ${formatDistanceToNow(new Date())} ago`},
    {id: 3, status: '', description: 'Active task', created: `created ${formatDistanceToNow(new Date())} ago`},
]

export default function App() {
    return (
        <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <NewTaskForm />
            </header>
            <section className="main">
                <TaskList todos={data} />
                <Footer />
            </section>
        </section>
    );
}
