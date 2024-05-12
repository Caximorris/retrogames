import Square from './Square';
import PropTypes from 'prop-types';
import '../../../styles/TicTacToe.css';

const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => (
    <Square key={i} value={squares[i]} onClick={() => onClick(i)} />
  );

  return (
    <div className="ttt-board">
      {[0, 1, 2].map((row) => (
        <div key={row} className="board-row">
          {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
        </div>
      ))}
    </div>
  );
};

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Board;