import PropTypes from 'prop-types';

import TasksFilter from './TasksFilter';

function Footer({ data, onChangeFilter, onClearCompleted, filter = 'All' }) {
  return (
    <footer className="footer">
      <span className="todo-count">{`${data.filter((task) => !task.completed).length} items left`}</span>
      <TasksFilter onChangeFilter={onChangeFilter} filter={filter} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
  onChangeFilter: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default Footer;
