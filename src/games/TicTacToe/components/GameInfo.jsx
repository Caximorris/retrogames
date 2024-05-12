import PropTypes from 'prop-types';
import '../../../styles/TicTacToe.css';

const GameInfo = ({ winner, isDraw, xIsNext }) => {
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = 'Draw!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return <div className="game-info">{status}</div>;
};

GameInfo.propTypes = {
  winner: PropTypes.string,
  isDraw: PropTypes.bool,
  xIsNext: PropTypes.bool,
};

export default GameInfo;