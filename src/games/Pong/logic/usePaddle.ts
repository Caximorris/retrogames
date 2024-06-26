import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { GameState, Paddle } from "../model/pong-model";

const usePaddle = (boardSize: { width: number, height: number }, upKey: string, downKey: string, playerOne: boolean, gameState: GameState): {
    paddle: Paddle
} => {
    let paddleHeightVariable = 0.15;
    let paddleWidthVariable = 0.01;
    switch (gameState.difficulty) {
        case 1:
            paddleHeightVariable = 0.2;
            paddleWidthVariable = 0.015;
            break;
        case 2:
            paddleHeightVariable = 0.15;
            paddleWidthVariable = 0.01;
            break;
        case 3:
            paddleHeightVariable = 0.1;
            paddleWidthVariable = 0.005;
            break;
        default:
            paddleHeightVariable = 0.15;
            paddleWidthVariable = 0.01;
            break;
    }

    const size = useMemo(() => ({
        height: Math.round(boardSize.height * paddleHeightVariable),
        width: Math.round(boardSize.width * paddleWidthVariable)
    }), [boardSize.height, boardSize.width, paddleHeightVariable, paddleWidthVariable]);

    const initialPosition = useMemo(() => Math.round(boardSize.height / 2 - size.height / 2), [boardSize.height, size.height]);
    const [position, setPosition] = useState(initialPosition);
    const positionRef = useRef(position);
    const boardSizeRef = useRef(boardSize);
    const animationFrameRef = useRef<number>();

    const getNextPaddlePosition = useCallback((currentPosition: number, isGoingUp: boolean) => {
        const adjustmentSize = Math.round(boardSize.height * 0.01);
        const adjustment = isGoingUp ? -adjustmentSize : adjustmentSize;
        const newPosition = currentPosition + adjustment;
        return Math.max(0, Math.min(boardSize.height - size.height, newPosition));
    }, [boardSize.height, size.height]);

    useEffect(() => {
        const keyState: { [key: string]: boolean } = {};

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === upKey || e.key === downKey) {
                e.preventDefault();
                if (!gameState.isPaused && gameState.hasStarted) {
                    keyState[e.key] = true;
                }
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === upKey || e.key === downKey) {
                e.preventDefault();
                if (!gameState.isPaused && gameState.hasStarted) {
                    keyState[e.key] = false;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const gameLoop = () => {
            let nextPosition = positionRef.current;

            if (gameState.hasStarted) {
                if (keyState[upKey]) {
                    nextPosition = getNextPaddlePosition(nextPosition, true);
                } else if (keyState[downKey]) {
                    nextPosition = getNextPaddlePosition(nextPosition, false);
                }
            }

            if (positionRef.current !== nextPosition) {
                setPosition(nextPosition);
                positionRef.current = nextPosition;
            }
            animationFrameRef.current = requestAnimationFrame(gameLoop);
        };

        gameLoop();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            cancelAnimationFrame(animationFrameRef.current as number);
        };
    }, [upKey, downKey, getNextPaddlePosition, gameState]);

    useEffect(() => {
        if (!gameState.hasStarted) {
            setPosition(initialPosition);
            positionRef.current = initialPosition;
        }
    }, [gameState.hasStarted, initialPosition, setPosition]);

    useEffect(() => {
        if (boardSizeRef.current.height !== boardSize.height) {
            const adjustedPosition = Math.round(position / boardSizeRef.current.height * boardSize.height);
            setPosition(adjustedPosition);
            positionRef.current = adjustedPosition;
            boardSizeRef.current = boardSize;
        }
    }, [boardSize, position]);

    const leftPosition = Math.round(boardSize.width * 0.05);
    const rightPosition = boardSize.width - size.width - leftPosition;
    const paddle = {
        position: {
            x: playerOne ? leftPosition : rightPosition,
            y: position,
        }, size
    };

    return {paddle};
};

export default usePaddle;