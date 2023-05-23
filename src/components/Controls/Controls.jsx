import PropTypes from 'prop-types';
import css from './Controls.module.css';

function Controls({ options, onLeaveFeedBack }) {
  return (
    <div>
      {options.map(option => {
        return (
          <button
            type="button"
            key={option}
            class={css.controls}
            onClick={() => onLeaveFeedBack(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

Controls.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onLeaveFeedBack: PropTypes.func.isRequired,
};

export default Controls;
