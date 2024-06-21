import { useState, useRef, useCallback } from 'react';
import { initializeGame } from './logic/snakeLogic';
import { GameState } from "./model/snake-model";
import GameInfo from "./components/GameInfo";
import BoardContainer from "./components/BoardContainer";
import PauseSnake from "./components/PauseSnake";

const Snake = () => {
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const gameRef = useRef(gameState);

  const handlePause = useCallback(() => {
    setGameState({
      ...gameState,
      isPaused: !gameState.isPaused,
      hasStarted: true
    });
  }, [gameState, setGameState]);

  const handleReset = useCallback(() => {
    const newInitialState = initializeGame();
    setGameState(newInitialState);
    gameRef.current = newInitialState;
  }, []);

  return (
    <div className="snake-game">
      <GameInfo score={gameState.score} />
      <BoardContainer gameState={gameState} setGameState={setGameState} />
      <PauseSnake gameState={gameState} onPause={handlePause} />
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Snake;
