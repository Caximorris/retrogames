import { useState, useRef, useCallback } from 'react';
import BoardContainer from './components/BoardContainer';
import GameInfo from './components/GameInfo';
import { initializeGame } from './logic/pongLogic';
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
      <BoardContainer gameState={gameState} setGameState={setGameState} />
      <PausePong gameState={gameState} setGameState={setGameState} />
      <ResetBt reset={handleReset} />
    </div>
  );
};

export default Pong;
