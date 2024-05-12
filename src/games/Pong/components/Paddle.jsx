import PropTypes from 'prop-types';
import usePaddle from "../logic/usePaddle.js";

const Paddle = ({ boardSize, upKey, downKey, isPlayerOne }) => {
     const {position, size} = usePaddle(boardSize, upKey, downKey);

  return (
      <div
          className="paddle"
          style={{
            top: `${position}px`,
            left: isPlayerOne ? '5%' : '95%',
            position: 'absolute',
            width: `${size.width}px`,
            height: `${size.height}px`,
            backgroundColor: 'white',
          }}
      />
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
