import { useRef, useEffect, useState } from 'react';
import Paddle from './Paddle';
import Ball from './Ball';
import usePaddle from '../logic/usePaddle';
import useBall from '../logic/useBall';

const Board = () => {
    const boardRef = useRef();
    const [boardSize, setBoardSize] = useState({ width: 800, height: 400 }); // Default size or state
    const playerOne = usePaddle(boardSize, 'w', 's', true);
    const playerTwo = usePaddle(boardSize, 'ArrowUp', 'ArrowDown', false);
    const ball = useBall(boardSize, [playerOne, playerTwo]);

    useEffect(() => {
        const handleResize = () => {
            const board = boardRef.current;
            const boardRect = board.getBoundingClientRect();

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
    }, []);

    if (!boardSize) {
        return <div ref={boardRef} className="pong-board" />
    }

    return (
        <div ref={boardRef} className="pong-board">
            <Paddle {...playerOne} />
            <Paddle {...playerTwo} />
            <Ball {...ball} />
        </div>
    );
}

export default Board;
