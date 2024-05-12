import PropTypes from 'prop-types';

function ResetBt({ reset }) {
  return (
    <button onClick={reset}>Reset</button>
  );
}

ResetBt.propTypes = {
  reset: PropTypes.func.isRequired,
};

export default ResetBt;