import PropTypes from 'prop-types';

const PausePong = ({ gameState, setGameState }) => {
    const handlePause = () => {
        setGameState((prevState) => ({
            ...prevState,
            isPaused: !prevState.isPaused
        }));
    };

    return (
        <button onClick={handlePause}>
            {gameState.isPaused && gameState.score.player1 === 0 && gameState.score.player2 === 0 ? 'Start Game' : gameState.isPaused ? 'Resume' : 'Pause'}
        </button>
    );
};

PausePong.propTypes = {
    gameState: PropTypes.object.isRequired,
    setGameState: PropTypes.func.isRequired
};

export default PausePong;
