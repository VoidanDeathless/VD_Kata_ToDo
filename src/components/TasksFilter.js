import PropTypes from 'prop-types';

function TasksFilter({ onChangeFilter, filter = 'All', tabs = ['All', 'Active', 'Completed'] }) {
  const filters = tabs.map((tab) => (
    <li key={tab}>
      <label htmlFor={tab} className={filter === tab ? 'selected' : ''}>
        <input type="radio" name="filter" id={tab} onClick={() => onChangeFilter(tab)} />
        {tab}
      </label>
    </li>
  ));

  return <ul className="filters">{filters}</ul>;
}

TasksFilter.propTypes = {
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
  tabs: PropTypes.array,
  onChangeFilter: PropTypes.func.isRequired,
};

export default TasksFilter;
