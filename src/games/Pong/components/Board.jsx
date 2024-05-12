import { useRef, useEffect, useState } from 'react';
import Paddle from './Paddle';
import Ball from './Ball';
import '../../../styles/Pong.css';

const Board = () => {
    const boardRef = useRef()
    const [boardSize, setBoardSize] = useState(null)

    useEffect(() => {
        const handleResize = () => {
            const board = boardRef.current
            const boardRect = board.getBoundingClientRect()

            setBoardSize({
                width: boardRect.width,
                height: boardRect.height
            })
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [boardRef])

    if (!boardSize) {
        return <div ref={boardRef} className="pong-board" />
    }

    return (
        <div ref={boardRef} className="pong-board">
            <Paddle upKey='w' downKey='s' boardSize={boardSize} isPlayerOne />
            <Paddle upKey='ArrowUp' downKey='ArrowDown' boardSize={boardSize} />
            <Ball />
        </div>
    );
}

export default Board;