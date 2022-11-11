import { Component } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from './TasksFilter';

export default class Footer extends Component {
  static defaultProps = {
    filter: 'All',
  };

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
    onChangeFilter: PropTypes.func.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
  };

  render() {
    return (
      <footer className="footer">
        <span className="todo-count">{`${this.props.data.filter((task) => !task.completed).length} items left`}</span>
        <TasksFilter filter={this.props.filter} onChangeFilter={this.props.onChangeFilter} />
        <button type="button" className="clear-completed" onClick={this.props.onClearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
