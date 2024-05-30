import {useRef, useEffect, FC, Dispatch, SetStateAction} from 'react';
import {GameState} from "../model/snake-model";
import SnakePlayer from "./SnakePlayer";
import Food from "./Food";
import useSnake from "../logic/useSnake";
import useFood from "../logic/useFood";

type BoardProps = {
    gameState: GameState;
    setGameState: Dispatch<SetStateAction<GameState>>;
    boardSize: {width: number, height: number};
    setBoardSize: (boardSize: {width: number, height: number}) => void;
};

const Board: FC<BoardProps> = ({ gameState, setGameState, boardSize, setBoardSize }) => {
    const boardRef = useRef<HTMLDivElement | null>(null);
    const snake = useSnake();
    const food = useFood();
    console.log(snake);

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
        <div ref={boardRef} className="snake-board">
            {/* <SnakePlayer {...snake} /> */}
            <Food {...food} />
        </div>
    );
};

export default Board;
