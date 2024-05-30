import {FC} from "react";
import {GameState} from "../model/pong-model";

type PausePongProps = {
    gameState: GameState;
    onPause: (gameState: GameState) => void
};


const PausePong: FC<PausePongProps> = ({ gameState, onPause }) => {
    const handlePause = () => {
        onPause({
            ...gameState,
            isPaused: !gameState.isPaused,
            hasStarted: true
        });
    };

    const isDisabled = gameState.score.winner !== null || gameState.difficulty === null;
    
    return (
        <button onClick={handlePause} disabled={isDisabled} style={{opacity: isDisabled ? 0.3 : 1}}>
            {!gameState.hasStarted ? 'Start Game' : gameState.isPaused ? 'Resume' : 'Pause'}
        </button>
    );
};

export default PausePong;
