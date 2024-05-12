import {useState, useEffect, useRef, useMemo, useCallback} from 'react';

const usePaddle = (boardSize, upKey, downKey) => {
    const size = useMemo(() => ({
        height: Math.round(boardSize.height * 0.2),
        width: Math.round(boardSize.width * 0.02)
    }), [boardSize.height, boardSize.width]);

    const initialPosition = useMemo(() => Math.round(boardSize.height / 2 - size.height / 2), [boardSize.height, size.height]);
    const [position, setPosition] = useState(initialPosition);
    const positionRef = useRef(position);
    const boardSizeRef = useRef(boardSize);
    const animationFrameRef = useRef();

    const getNextPaddlePosition = useCallback((currentPosition, isGoingUp) => {
        const adjustmentSize = Math.round(boardSize.height * 0.01);
        const adjustment = isGoingUp ? -adjustmentSize : adjustmentSize;
        const newPosition = currentPosition + adjustment;
        return Math.max(0, Math.min(boardSize.height - size.height, newPosition));
    }, [boardSize.height, size.height]);

    useEffect(() => {
        const keyState = {};

        const handleKeyDown = (e) => {
            if (e.key === upKey || e.key === downKey) {
                e.preventDefault();
                keyState[e.key] = true;
            }
        };

        const handleKeyUp = (e) => {
            if (e.key === upKey || e.key === downKey) {
                e.preventDefault();
                keyState[e.key] = false;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const gameLoop = () => {
            let nextPosition = positionRef.current;
            if (keyState[upKey]) {
                nextPosition = getNextPaddlePosition(nextPosition, true);
            } else if (keyState[downKey]) {
                nextPosition = getNextPaddlePosition(nextPosition, false);
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
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [upKey, downKey, size.height, getNextPaddlePosition]);

    useEffect(() => {
        if (boardSizeRef.current.height !== boardSize.height) {
            const adjustedPosition = Math.round(position / boardSizeRef.current.height * boardSize.height);
            setPosition(adjustedPosition);
            positionRef.current = adjustedPosition;
            boardSizeRef.current = boardSize;
        }
    }, [boardSize, position]);

    return { position, size };
};

export default usePaddle;
