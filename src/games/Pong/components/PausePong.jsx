import PropTypes from 'prop-types';

const PausePong = ({ gameState, setGameState }) => {
    const handlePause = () => {
        setGameState((prevState) => ({
            ...prevState,
            isPaused: !prevState.isPaused,
            hasStarted: true
        }));
    };

    if (gameState.score.winner || !gameState.dificulty) {
        return null;
    }

    return (
        <button onClick={handlePause}>
            {!gameState.hasStarted ? 'Start Game' : gameState.isPaused ? 'Resume' : 'Pause'}
        </button>
    );
};

PausePong.propTypes = {
    gameState: PropTypes.object.isRequired,
    setGameState: PropTypes.func.isRequired
};

export default PausePong;
