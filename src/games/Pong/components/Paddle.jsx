import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';

const keyState = {}

const Paddle = ({ boardSize, upKey, downKey, isPlayerOne }) => {
  const [position, setPosition] = useState(Math.round(boardSize.height / 2))
  const positionRef = useRef(position);
  const gameTimeoutRef = useRef();

  function getNextPaddlePosition(position, isGoingUp, boardSize) {
    if (position.y > boardSize.height) {
      return boardSize.height
    }
    if (position.y < 0) {
      return 0
    }
    return position.y + (isGoingUp ? -20 : 20)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      keyState[e.key] = true;
    };

    const handleKeyUp = (e) => {
      e.preventDefault();
      keyState[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);

    const gameLoop = () => {
      let nextPosition = positionRef.current;
      if (keyState[upKey] || keyState[downKey]) {
        nextPosition = getNextPaddlePosition(position, keyState[upKey], boardSize);
      }

      if (position !== nextPosition) {
        setPosition(nextPosition);
        positionRef.current = nextPosition;
      }
      gameTimeoutRef.current = setTimeout(gameLoop, 15);
    };

    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearTimeout(gameTimeoutRef.current)
    };
  }, [boardSize, downKey, upKey, position]);

  return (
    <div className="paddle" style={{ top: `${position}px`, left: isPlayerOne ? '5%' : '93%' }} />
  );
}

Paddle.propTypes = {
  isPlayerOne: PropTypes.bool,
  upKey: PropTypes.string.isRequired,
  downKey: PropTypes.string.isRequired,
  boardSize: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  })
};

export default Paddle;