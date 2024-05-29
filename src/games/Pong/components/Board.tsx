import {useRef, useEffect, FC, Dispatch, SetStateAction} from 'react';
import {Paddle as PaddleType} from "../model/pong-model";
import Paddle from './Paddle';
import Ball from './Ball';
import {GameState} from "../model/pong-model";
import {useBall} from "../logic/useBall";

type BoardProps = {
    gameState: GameState;
    setGameState: Dispatch<SetStateAction<GameState>>;
    playerOne: PaddleType;
    playerTwo: PaddleType;
    boardSize: {width: number, height: number};
    setBoardSize: (boardSize: {width: number, height: number}) => void;
    onBallPositionChange: (position: {x: number, y: number}) => void;
};

const Board: FC<BoardProps> = ({ gameState, setGameState, playerOne, playerTwo, boardSize, setBoardSize, onBallPositionChange }) => {
    const boardRef = useRef<HTMLDivElement | null>(null);
    const ball = useBall(boardSize, [playerOne, playerTwo], gameState, setGameState);

    useEffect(() => {
        onBallPositionChange(ball.position);
    }, [ball.position, onBallPositionChange]);

    useEffect(() => {
        const handleResize = () => {
            const board = boardRef.current;
            const boardRect = board!.getBoundingClientRect();

            setBoardSize({
                width: boardRect.width,
                height: boardRect.height
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [setBoardSize]);

    return (
        <div ref={boardRef} className="pong-board">
            <div className="pong-net" />
            <Paddle {...playerOne} />
            <Paddle {...playerTwo} />
            <Ball {...ball} />
        </div>
    );
};

export default Board;
