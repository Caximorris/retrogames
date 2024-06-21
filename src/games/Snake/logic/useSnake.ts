import { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { GameState } from "../model/snake-model";
import useKeyPress from "./useKeyPress";
import useInterval from './useInterval';
import { SetSnake } from '../model/snake-model';
import { initializeGame } from './snakeLogic';

const useSnake = (size: number, gameState: GameState, setGameState: Dispatch<SetStateAction<GameState>>) => {
    const [snake, setSnake] = useState<SetSnake[]>([{ col: size / 2, row: size / 2 }]);
    const [direction, setDirection] = useState('RIGHT');
    const generateFood = useCallback(() => {
        const randomPosition = () => Math.floor(Math.random() * size);
        return { col: randomPosition(), row: randomPosition() };
    }, [size]);
    const [food, setFood] = useState(generateFood());

    useKeyPress((key: string) => {
        if (key === 'ArrowUp' && direction !== 'DOWN') setDirection('UP');
        if (key === 'ArrowDown' && direction !== 'UP') setDirection('DOWN');
        if (key === 'ArrowLeft' && direction !== 'RIGHT') setDirection('LEFT');
        if (key === 'ArrowRight' && direction !== 'LEFT') setDirection('RIGHT');
    });

    useInterval(() => {
        if (!gameState.isPaused) {
            moveSnake();
        }
    }, 5000);

    const isCollision = useCallback((head: SetSnake, snake: SetSnake[]): boolean => {
        if (
            head.col < 0 || head.col >= size ||
            head.row < 0 || head.row >= size
        ) {
            return true;
        }
        for (const segment of snake) {
            if (head.col === segment.col && head.row === segment.row) {
                return true;
            }
        }
        return false;
    }, [size]);


    const moveSnake = useCallback(() => {
        const newSnake = [...snake];
        const head = { ...newSnake[0] };

        if (direction === 'UP') head.row -= 1;
        if (direction === 'DOWN') head.row += 1;
        if (direction === 'LEFT') head.col -= 1;
        if (direction === 'RIGHT') head.col += 1;

        newSnake.unshift(head);
        if (head.col === food.col && head.row === food.row) {
            setFood(generateFood());
            setGameState({ ...gameState, score: gameState.score + 1 });
        } else {
            newSnake.pop();
        }

        if (isCollision(head, newSnake)) {
            initializeGame();
        } else {
            setSnake(newSnake);
        }
    }, [direction, snake, food, setFood, setSnake, generateFood, isCollision, gameState, setGameState]);

    return { snake, food };
};

export default useSnake;