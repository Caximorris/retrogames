import { Dispatch, FC, SetStateAction } from 'react';
import { GameState } from "../model/snake-model";
import Board from "./Board";

type BoardContainerProps = {
    gameState: GameState
    setGameState: Dispatch<SetStateAction<GameState>>
}

const BoardContainer: FC<BoardContainerProps> = ({ gameState, setGameState }) => {
    let gridLength: number;

    if (gameState.difficulty === 0) {
        gridLength = 10
    } else if (gameState.difficulty === 1) {
        gridLength = 15
    } else {
        gridLength = 20
    }

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
            <div className="paused-snake-board">
                <div className="paused-snake-container">
                    <h1 className="paused-snake">Resume</h1>
                </div>
            </div>
        );
    }

    return (
        <Board
            gameState={gameState}
            setGameState={setGameState}
            size={gridLength}
        />
    );
};

export default BoardContainer;