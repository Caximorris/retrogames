import { useState, useEffect, useCallback } from 'react';

const BOARD_SIZE = 20; // 20x20 grid

const useSnake = () => {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [direction, setDirection] = useState({ x: 0, y: 1 });

    const moveSnake = useCallback(() => {
        setSnake(prevSnake => {
            const newSnake = [...prevSnake];
            const head = newSnake[0];
            const newHead = { x: head.x + direction.x, y: head.y + direction.y };

            // Check for wall collisions
            if (newHead.x >= BOARD_SIZE) newHead.x = 0;
            if (newHead.x < 0) newHead.x = BOARD_SIZE - 1;
            if (newHead.y >= BOARD_SIZE) newHead.y = 0;
            if (newHead.y < 0) newHead.y = BOARD_SIZE - 1;

            newSnake.unshift(newHead);
            newSnake.pop(); // Remove the last element
            return newSnake;
        });
    }, [direction]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowUp':
                if (direction.y === 0) setDirection({ x: 0, y: -1 });
                break;
            case 'ArrowDown':
                if (direction.y === 0) setDirection({ x: 0, y: 1 });
                break;
            case 'ArrowLeft':
                if (direction.x === 0) setDirection({ x: -1, y: 0 });
                break;
            case 'ArrowRight':
                if (direction.x === 0) setDirection({ x: 1, y: 0 });
                break;
            default:
                break;
        }
    }, [direction]);

    useEffect(() => {
        const interval = setInterval(moveSnake, 200); // Move snake every 200ms
        return () => clearInterval(interval);
    }, [moveSnake]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return { snake };
};

export default useSnake;