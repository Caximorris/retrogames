import { useState } from 'react';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import { calculateWinner, isDraw } from './logic/ticTacToeLogic';
import ResetBt from '../../components/ResetBt';

const TicTacToe = () => {
  const emptyBoard = Array(9).fill(null);
  const [squares, setSquares] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = [...squares];
    newSquares[i] = xIsNext ? 'X' : 'O';

    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  const draw = isDraw(squares);

  const handleReset = () => {
    setSquares(emptyBoard);
  };

  return (
    <div className="ttt-game">
      <GameInfo winner={winner} isDraw={draw} xIsNext={xIsNext} />
      <Board squares={squares} onClick={handleClick} />
      <ResetBt reset={handleReset} />
    </div>
  );
};

export default TicTacToe;