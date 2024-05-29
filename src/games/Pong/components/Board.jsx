import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paddle from './Paddle';
import Ball from './Ball';
import useBall from '../logic/useBall';

const Board = ({ gameState, setGameState, playerOne, playerTwo, boardSize, setBoardSize, onBallPositionChange }) => {
    const boardRef = useRef();
    const ball = useBall(boardSize, [playerOne, playerTwo], gameState, setGameState);

    useEffect(() => {
        onBallPositionChange(ball.position);
    }, [ball.position, onBallPositionChange]);

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
    }, [setBoardSize]);

    return (
        <div ref={boardRef} className="pong-board">
            <div className="pong-net" />
            <Paddle {...playerOne} />
            <Paddle {...playerTwo} />
            <Ball {...ball} />
        </div>
    );
};

Board.propTypes = {
    gameState: PropTypes.object.isRequired,
    setGameState: PropTypes.func.isRequired,
    playerOne: PropTypes.object.isRequired,
    playerTwo: PropTypes.object.isRequired,
    boardSize: PropTypes.object.isRequired,
    setBoardSize: PropTypes.func.isRequired,
    onBallPositionChange: PropTypes.func.isRequired,
};

export default Board;
