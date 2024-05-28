import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Paddle from './Paddle';
import Ball from './Ball';
import usePaddle from '../logic/usePaddle';
import useBall from '../logic/useBall';
import useAIPaddle from '../logic/useAIPaddle';

const Board = ({ gameState, setGameState }) => {
    const boardRef = useRef();
    const [boardSize, setBoardSize] = useState({ width: 800, height: 400 }); // Default size or state
    const playerOne = usePaddle(boardSize, 'w', 's', true, gameState);
    const playerTwo = usePaddle(boardSize, 'ArrowUp', 'ArrowDown', false, gameState);
    const ball = useBall(boardSize, [playerOne, playerTwo], gameState, setGameState);
    const AIPaddle = useAIPaddle(boardSize, ball, gameState);

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

    if (gameState.score.winner) {
        return (
            <div ref={boardRef} className="paused-board">
                <div className="paused-pong-container">
                    <h1 className="paused-pong">
                        {gameState.score.winner === 1 ? 'Player 1 Wins!' : 'Player 2 Wins!'}
                    </h1>
                </div>
            </div>
        );
    }

    if (!gameState.AIPlayer) {
        return (
            <div ref={boardRef} className="paused-board">
                <div className="paused-pong-container">
                    <h1 className="paused-pong">Pong</h1>
                    <div className="button-container">
                        <button className="paused-pong" onClick={() => setGameState({ ...gameState, AIPlayer: 1 })}>
                            vs AI
                        </button>
                        <button className="paused-pong" onClick={() => setGameState({ ...gameState, AIPlayer: 2 })}>
                            Local
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!gameState.hasStarted) {
        return (
            <div ref={boardRef} className="paused-board">
                <div className="paused-pong-container">
                    <h1 className="paused-pong">Pong Multiplayer</h1>
                    <h4 className="paused-pong">Use W and S to move left player</h4>
                    <h4 className="paused-pong">Use the arrow keys to move right player</h4>
                    <div className="button-container">
                        <button className="paused-pong" onClick={() => setGameState({ ...gameState, dificulty: 1 })}>
                            Easy
                        </button>
                        <button className="paused-pong" onClick={() => setGameState({ ...gameState, dificulty: 2 })}>
                            Medium
                        </button>
                        <button className="paused-pong" onClick={() => setGameState({ ...gameState, dificulty: 3 })}>
                            Hard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (gameState.isPaused) {
        return <div ref={boardRef} className="paused-board">
            <div className="paused-pong-container">
                <h1 className="paused-pong">Resume</h1>
            </div>
        </div>
    }

    return (
        <div ref={boardRef} className="pong-board">
            <div className="pong-net" />
            <Paddle {...(gameState.AIPlayer === 1 ? AIPaddle : gameState.AIPlayer === 2 ? playerOne: null)} />
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
