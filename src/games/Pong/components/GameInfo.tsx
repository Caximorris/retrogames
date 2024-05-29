import '../../../styles/Pong.css';
import {FC} from "react";

type GameInfoProps = {
    score: {
        player1: number,
        player2: number,
    }
}

const GameInfo: FC<GameInfoProps> = ({ score }) => {
  return <div className="game-info">{`Player 1: ${score.player1} | Player 2: ${score.player2}`}</div>;
};


export default GameInfo;