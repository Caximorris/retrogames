import { useRef, useEffect, useState, FC, Dispatch, SetStateAction } from 'react';
import { GameState } from "../model/snake-model";
import SnakePlayer from "./SnakePlayer";
import Food from "./Food";
import useSnake from "../logic/useSnake";
// import Square from "./Square";

type BoardProps = {
    gameState: GameState;
    setGameState: Dispatch<SetStateAction<GameState>>;
    size: number;
};

const Board: FC<BoardProps> = ({ gameState, setGameState, size }) => {
    const boardRef = useRef<HTMLDivElement | null>(null);
    const [cellSize, setCellSize] = useState(0);
    const {snake, food } = useSnake(size, gameState, setGameState);
    const foodPosition = { col: food.col * cellSize, row: food.row * cellSize };
    const snakePosition = snake.map((player) => ({
        col: player.col * cellSize,
        row: player.row * cellSize,
    }));

    useEffect(() => {
        const handleResize = () => {
            const board = boardRef.current;
            const boardRect = board!.getBoundingClientRect();

            setCellSize(boardRect.width / size);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [setCellSize, size]);

    if (!cellSize) {
        return <div ref={boardRef} className="snake-board"></div>;
    }

    return (
        <div ref={boardRef} className="snake-board">
            {snakePosition.map((position, index) => (
                <SnakePlayer key={index} position={position} cellSize={cellSize}/>
            ))}
            <Food position={foodPosition} cellSize={cellSize}/>
        </div>
    );
};

export default Board;