import PropTypes from 'prop-types';
import '../../../styles/Pong.css';

const GameInfo = ({winner, score1, score2}) => {
    let status;
    if (winner === 1) {
        status = `Player 1 wins!`;
    } else if (winner === 2) {
        status = `Player 2 wins!`;
    } else {
        status = `Player 1: ${score1} | Player 2: ${score2}`;
    }

  return <div className="game-info">{status}</div>;
};

GameInfo.propTypes = {
  winner: PropTypes.number,
    score1: PropTypes.number,
    score2: PropTypes.number,
};

export default GameInfo;