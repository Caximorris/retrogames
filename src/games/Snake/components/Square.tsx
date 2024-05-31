import SnakePlayer from "./SnakePlayer";
import Food from "./Food";

const Squares = ({ position, food }: { position: { colIndex: number, rowIndex: number }, snake: { col: number, row: number }, food: { col: number, row: number } }) => {
  return (
    <div className="square">
      {position.colIndex === food.col && position.rowIndex === food.col ? <Food /> : null}
      {position.colIndex === snake.row && position.rowIndex === snake.row ? <SnakePlayer /> : null} 
    </div>
  );
}

export default Squares;