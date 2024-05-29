import { useState } from 'react';
import PropTypes from 'prop-types';
import usePaddle from '../logic/usePaddle';
import Board from './Board';

const BoardContainer = ({ gameState, setGameState }) => {
    const [boardSize, setBoardSize] = useState({ width: 800, height: 400 }); // Default size or state
    const { paddle: playerOne, handleBallPositionChange } = usePaddle(boardSize, 'w', 's', true, gameState);
    const { paddle: playerTwo} = usePaddle(boardSize, 'ArrowUp', 'ArrowDown', false, gameState);
    
    if (gameState.score.winner) {
        return (
            <div className="paused-board">
                <div className="paused-pong-container">
                    <h1 className="paused-pong">
                        {gameState.score.winner === 1 ? 'Player 1 Wins!' : 'Player 2 Wins!'}
                    </h1>
                </div>
            </div>
        );
    }

    if (!gameState.gameMode) {
        return (
            <div className="paused-board">
                <div className="paused-pong-container">
                    <h1 className="paused-pong">Pong</h1>
                    <div className="button-container">
                        <button className="paused-pong" onClick={() => setGameState({ ...gameState, gameMode: "singlePlayer" })}>
                            CPU vs Player
                        </button>
                        <button className="paused-pong" onClick={() => setGameState({ ...gameState, gameMode: "multiPlayer" })}>
                            Player vs Player
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!gameState.hasStarted) {
        return (
            <div className="paused-board">
                <div className="paused-pong-container">
                    <h1 className="paused-pong">
                        {gameState.gameMode === "singlePlayer" ? 'Pong Singleplayer' : 'Pong Multiplayer'}
                    </h1>
                    <h4 className="paused-pong">
                        {gameState.gameMode === "multiPlayer" ? 'Use W and S to move left player' : null}
                    </h4>
                    <h4 className="paused-pong">Use the arrow keys to move right player</h4>
                    <div className="button-container">
                        <button className="paused-pong" onClick={() => setGameState({ ...gameState, dificulty: 1 })}>
                            Easy
                        </button>
                        <button className="paused-pong" onClick={() => setGameState({ ...gameState, dificulty: 2 })}>
                            Medium
                        </button>
                        <button className="paused-pong" onClick={() => setGameState({ ...gameState, dificulty: 3 })}>
                            Hard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (gameState.isPaused) {
        return (
            <div className="paused-board">
                <div className="paused-pong-container">
                    <h1 className="paused-pong">Resume</h1>
                </div>
            </div>
        );
    }

    return (
        <Board
            gameState={gameState}
            setGameState={setGameState}
            playerOne={playerOne}
            playerTwo={playerTwo}
            boardSize={boardSize}
            setBoardSize={setBoardSize}
            onBallPositionChange={handleBallPositionChange}
        />
    );
};

BoardContainer.propTypes = {
    gameState: PropTypes.object.isRequired,
    setGameState: PropTypes.func.isRequired
};

export default BoardContainer;