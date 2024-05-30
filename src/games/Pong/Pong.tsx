import { useState, useRef, useCallback } from 'react';
import { initializeGame } from './logic/PongLogic';
import {GameState} from "./model/pong-model";
import GameInfo from "./components/GameInfo";
import BoardContainer from "./components/BoardContainer";
import PausePong from "./components/PausePong";

const Pong = () => {
  const initialState = initializeGame();
  const [gameState, setGameState] = useState<GameState>(initialState);
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
    <div className="pong-game">
      <GameInfo score={gameState.score}/>
      <BoardContainer gameState={gameState} setGameState={setGameState}/>
      <PausePong gameState={gameState} onPause={handlePause}/>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Pong;
