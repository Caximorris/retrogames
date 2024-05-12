import {useState} from 'react';
import PropTypes from 'prop-types';
import '../../../styles/TicTacToe.css';

const Square = ({ value, onClick }) => {
  const [count, setCount] = useState(0);

  return (
    <button className="cell" onClick={() => {
      setCount(count + 1);
      onClick();
    }}>
      {value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Square;