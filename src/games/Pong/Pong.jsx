import { useState, useRef, useCallback } from 'react';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import { initializeGame } from './logic/PongLogic';
import ResetBt from '../../components/ResetBt';

const Pong = () => {
  const initialState = initializeGame()
  const [gameState, setGameState] = useState(initialState);
  const gameRef = useRef(gameState);

  const handleReset = useCallback(() => {
    setGameState(initialState);
    gameRef.current = initialState;
  }, [initialState]);

  return (
    <div className="pong-game">
      <GameInfo score={gameState.score} />
      <Board />
      <ResetBt reset={handleReset} />
    </div>
  );
};

export default Pong;
