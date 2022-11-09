import { Component } from "react";

export default class TasksFilter extends Component {
    state = {
        tabs: ["All", "Active", "Completed"],
    };

    render() {
        const tabs = this.state.tabs.map((tab, id) => {
            return (
                <li key={id}>
                    <button
                        onClick={() => this.props.onChangeFilter(tab)}
                        className={(this.props.filter === tab) ? "selected" : ""}
                    >
                        {tab}
                    </button>
                </li>
            );
        });

        return <ul className="filters">{tabs}</ul>;
    }
}
