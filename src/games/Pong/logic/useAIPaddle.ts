import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { GameState, Paddle } from "../model/pong-model";

const useAIPaddle = (boardSize: { width: number, height: number }, gameState: GameState): {
    paddle: Paddle
    handleBallPositionChange: (position: {x: number, y: number}) => void
} => {
    const [ball, setBall] = useState({ position: { x: 0, y: 0 } });

    let velocity = 0.3;
    let paddleHeightVariable = 0.15;
    let paddleWidthVariable = 0.01;
    switch (gameState.difficulty) {
        case 1:
            paddleHeightVariable = 0.2;
            paddleWidthVariable = 0.015;
            velocity = 0.15;
            break;
        case 2:
            paddleHeightVariable = 0.15;
            paddleWidthVariable = 0.01;
            velocity = 0.22;
            break;
        case 3:
            paddleHeightVariable = 0.1;
            paddleWidthVariable = 0.005;
            velocity = 0.35;
            break;
        default:
            paddleHeightVariable = 0.15;
            paddleWidthVariable = 0.01;
            velocity = 0.25;
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

    const getNextPaddlePosition = useCallback((currentPosition: number, targetPosition: number) => {
        const adjustmentSize = Math.round(boardSize.height * 0.01 * velocity);
        const direction = targetPosition > currentPosition ? 1 : -1;
        const adjustment = direction * adjustmentSize;
        const newPosition = currentPosition + adjustment;
        return Math.max(0, Math.min(boardSize.height - size.height, newPosition));
    }, [boardSize.height, size.height, velocity]);

    useEffect(() => {
        const gameLoop = () => {
            let nextPosition = positionRef.current;

            if (gameState.hasStarted && ball.position.x < boardSize.width / 2) {
                nextPosition = getNextPaddlePosition(nextPosition, ball.position.y);
            }

            if (positionRef.current !== nextPosition) {
                setPosition(nextPosition);
                positionRef.current = nextPosition;
            }
            animationFrameRef.current = requestAnimationFrame(gameLoop);
        };

        if (!gameState.isPaused) {
            gameLoop();
        }

        return () => {
            cancelAnimationFrame(animationFrameRef.current as number);
        };
    }, [ball.position.y, ball.position.x, getNextPaddlePosition, gameState.hasStarted, gameState.isPaused, boardSize.width]);

    useEffect(() => {
        if (!gameState.hasStarted) {
            setPosition(initialPosition);
            positionRef.current = initialPosition;
        }
    }, [gameState.hasStarted, initialPosition]);

    useEffect(() => {
        if (boardSizeRef.current.height !== boardSize.height) {
            const adjustedPosition = Math.round(position / boardSizeRef.current.height * boardSize.height);
            setPosition(adjustedPosition);
            positionRef.current = adjustedPosition;
            boardSizeRef.current = boardSize;
        }
    }, [boardSize, position]);

    const leftPosition = Math.round(boardSize.width * 0.05);
    const paddle = {
        position: {
            x: leftPosition,
            y: position,
        }, size
    };

    const handleBallPositionChange = useCallback((position: {x: number, y: number}) => {
        setBall(prevBall => ({ ...prevBall, position }));
    }, []);

    return { paddle, handleBallPositionChange };
};

export default useAIPaddle;