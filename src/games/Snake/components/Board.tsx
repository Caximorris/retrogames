import { useRef, useEffect, useState, FC, Dispatch, SetStateAction } from 'react';
import { GameState } from "../model/snake-model";
import SnakePlayer from "./SnakePlayer";
import Food from "./Food";
import useSnake from "../logic/useSnake";
import useFood from "../logic/useFood";
import Square from "./Square";

type BoardProps = {
    gameState: GameState;
    setGameState: Dispatch<SetStateAction<GameState>>;
    size: number;
};

const Board: FC<BoardProps> = ({ gameState, setGameState, size }) => {
    const boardRef = useRef<HTMLDivElement | null>(null);
    const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });
    const length = gameState.snake.length;
    const snake = useSnake(size, gameState);
    const { food, generateFood } = useFood(size);

    if (food.row === snake.row && food.col === snake.col) {
        generateFood();
        setGameState({ ...gameState, snake: { ...snake, length: length + 1 } });
    }

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
            {Array.from({ length: size }).map((_, rowIndex) => (
                <div key={rowIndex} className="row">
                    {Array.from({ length: size }).map((_, colIndex) => (
                        <Square key={`${rowIndex}_${colIndex}`} position={{colIndex, rowIndex}} snake={snake} food={food}/>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;