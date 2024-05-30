import { Dispatch, FC, SetStateAction, useState } from 'react';
import { GameState } from "../model/snake-model";
import Board from "./Board";

type BoardContainerProps = {
    gameState: GameState
    setGameState: Dispatch<SetStateAction<GameState>>
}

const BoardContainer: FC<BoardContainerProps> = ({ gameState, setGameState }) => {
    const [boardSize, setBoardSize] = useState({ width: 600, height: 600 }); // Default size or state

    if (!gameState.hasStarted) {
        return (
            <div className="paused-snake-board">
                <div className="paused-snake-container">
                    <h1 className="paused-snake">
                        Snake
                    </h1>
                    <h4 className="paused-snake">Use the arrow keys to move</h4>
                    <div className="button-container">
                        <button className="paused-snake" onClick={() => setGameState({ ...gameState, difficulty: 1 })}>
                            Easy
                        </button>
                        <button className="paused-snake" onClick={() => setGameState({ ...gameState, difficulty: 2 })}>
                            Medium
                        </button>
                        <button className="paused-snake" onClick={() => setGameState({ ...gameState, difficulty: 3 })}>
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
            boardSize={boardSize}
            setBoardSize={setBoardSize}
        />
    );
};

export default BoardContainer;