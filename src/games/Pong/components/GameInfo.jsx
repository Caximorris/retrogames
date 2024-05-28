import PropTypes from 'prop-types';
import '../../../styles/Pong.css';

const GameInfo = ({ score }) => {
  let status;
  status = `Player 1: ${score.player1} | Player 2: ${score.player2}`;
  return <div className="game-info">{status}</div>;
};

GameInfo.propTypes = {
  score: PropTypes.shape({
    winner: PropTypes.number,
    player1: PropTypes.number,
    player2: PropTypes.number,
  }).isRequired,
};

export default GameInfo;