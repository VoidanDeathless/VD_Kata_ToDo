import { Component } from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  static defaultProps = {
    filter: 'All',
    tabs: ['All', 'Active', 'Completed'],
  };

  static propTypes = {
    filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
    tabs: PropTypes.array,
    onChangeFilter: PropTypes.func.isRequired,
  };

  render() {
    const tabs = this.props.tabs.map((tab) => (
      <li key={tab}>
        <button
          type="button"
          onClick={() => this.props.onChangeFilter(tab)}
          className={this.props.filter === tab ? 'selected' : ''}
        >
          {tab}
        </button>
      </li>
    ));

    return <ul className="filters">{tabs}</ul>;
  }
}
