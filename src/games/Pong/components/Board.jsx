import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Paddle from './Paddle';
import Ball from './Ball';
import usePaddle from '../logic/usePaddle';
import useBall from '../logic/useBall';

const Board = ({ gameState, setGameState }) => {
    const boardRef = useRef();
    const [boardSize, setBoardSize] = useState({ width: 800, height: 400 }); // Default size or state
    const playerOne = usePaddle(boardSize, 'w', 's', true);
    const playerTwo = usePaddle(boardSize, 'ArrowUp', 'ArrowDown', false);
    const ball = useBall(boardSize, [playerOne, playerTwo], gameState, setGameState); // Pass setGameState

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

    if (gameState.isPaused) {
        return <div ref={boardRef} className="pong-board">
            <h1 className="paused-pong">
                {gameState.isPaused && gameState.score.player1 === 0 && gameState.score.player2 === 0 ? 'Pong Classic' : gameState.isPaused ? 'Resume' : 'Pause'}
            </h1>
        </div>
    }

    return (
        <div ref={boardRef} className="pong-board">
            <Paddle {...playerOne} />
            <Paddle {...playerTwo} />
            <Ball {...ball} />
        </div>
    );
}

Board.propTypes = {
    gameState: PropTypes.object.isRequired,
    setGameState: PropTypes.func.isRequired
};

export default Board;
