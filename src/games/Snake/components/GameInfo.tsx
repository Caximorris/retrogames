import '../../../styles/Snake.css';
import {FC} from "react";

type GameInfoProps = {
    score: number
}

const GameInfo: FC<GameInfoProps> = ({ score }) => {
  return <div className="game-info">{`Score: ${score}`}</div>;
};


export default GameInfo;