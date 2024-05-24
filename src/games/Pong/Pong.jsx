import { useState, useRef, useCallback } from 'react';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import { initializeGame } from './logic/PongLogic';
import ResetBt from '../../components/ResetBt';
import PausePong from './components/PausePong';

const Pong = () => {
  const initialState = initializeGame();
  const [gameState, setGameState] = useState(initialState);
  const gameRef = useRef(gameState);

  const handleReset = useCallback(() => {
    const newInitialState = initializeGame();
    setGameState(newInitialState);
    gameRef.current = newInitialState;
  }, []);

  return (
    <div className="pong-game">
      <GameInfo score={gameState.score} />
      <Board gameState={gameState} setGameState={setGameState} />
      <PausePong gameState={gameState} setGameState={setGameState} />
      <ResetBt reset={handleReset} />
    </div>
  );
};

export default Pong;
