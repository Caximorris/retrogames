import PropTypes from 'prop-types';

const PausePong = ({ gameState, setGameState }) => {
    const handlePause = () => {
        setGameState((prevState) => ({
            ...prevState,
            isPaused: !prevState.isPaused,
            hasStarted: true
        }));
    };

    const isDisabled = gameState.score.winner || !gameState.dificulty;
    
    return (
        <button onClick={handlePause} disabled={isDisabled} style={{opacity: isDisabled ? 0.3 : 1}}>
            {!gameState.hasStarted ? 'Start Game' : gameState.isPaused ? 'Resume' : 'Pause'}
        </button>
    );
};

PausePong.propTypes = {
    gameState: PropTypes.object.isRequired,
    setGameState: PropTypes.func.isRequired
};

export default PausePong;
