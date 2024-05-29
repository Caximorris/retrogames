import {useEffect, useRef, useMemo, useCallback, useState, SetStateAction, Dispatch} from 'react';
import {GameState, Paddle} from "../model/pong-model";

const getVelocityMagnitude = (boardSize: {width: number, height: number}) => {
    return Math.sqrt((boardSize.width ** 2 + boardSize.height ** 2)) * 0.005;
};

const getRandomVelocity = (boardSize: {width: number, height: number}, ballXVelocityVariable: number) => {
    const magnitude = getVelocityMagnitude(boardSize);
    const xDirection = Math.random() > 0.5 ? 1 : -1;
    const yDirection = Math.random() > 0.5 ? 1 : -1;
    const xVelocity = Math.abs(magnitude * ballXVelocityVariable) * xDirection;
    let yVelocity = magnitude * Math.random() * yDirection;
    const minYVelocity = magnitude * 0.5;
    if (Math.abs(yVelocity) < minYVelocity) {
        yVelocity = yDirection * minYVelocity;
    }
    return {
        x: xVelocity,
        y: yVelocity
    };
};

const checkPaddleCollision = (paddle: Paddle, ballPos: {x: number, y: number}, diameter: number, isPlayerOne: number) => {
    const paddleXEnd = paddle.position.x + paddle.size.width;
    const paddleYEnd = paddle.position.y + paddle.size.height;
    if (isPlayerOne) {
        // For player one, collision should occur only on the right side of the paddle
        return ballPos.x <= paddleXEnd &&
            ballPos.x + diameter >= paddle.position.x &&
            ballPos.y + diameter >= paddle.position.y &&
            ballPos.y <= paddleYEnd;
    } else {
        // For player two, collision should occur only on the left side of the paddle
        return ballPos.x + diameter >= paddle.position.x &&
            ballPos.x <= paddleXEnd &&
            ballPos.y + diameter >= paddle.position.y &&
            ballPos.y <= paddleYEnd;
    }
};

const difficultySettings = (difficulty: number | null) => {
    let ballXVelocityVariable;
    let ballDiameterVariable;
    switch (difficulty) {
        case 1:
            ballXVelocityVariable = 0.5;
            ballDiameterVariable = 0.05;
            break;
        case 2:
            ballXVelocityVariable = 0.707;
            ballDiameterVariable = 0.035;
            break;
        case 3:
            ballXVelocityVariable = 0.9;
            ballDiameterVariable = 0.02;
            break;
        default:
            ballXVelocityVariable = 0.707;
            ballDiameterVariable = 0.035;
            break;
    }
    return { ballXVelocityVariable, ballDiameterVariable };
}

export const useBall = (boardSize: {width: number, height: number}, paddles: [Paddle, Paddle], gameState: GameState, setGameState: Dispatch<SetStateAction<GameState>>) => {
    const { ballXVelocityVariable, ballDiameterVariable } = difficultySettings(gameState.difficulty);

    const diameter = useMemo(() => Math.round(boardSize.height * ballDiameterVariable), [boardSize.height, ballDiameterVariable]);
    const initialPosition = useMemo(() => ({
        x: boardSize.width / 2 - diameter / 2,
        y: boardSize.height / 2 - diameter / 2,
    }), [boardSize.width, boardSize.height, diameter]);

    const [position, setPosition] = useState(initialPosition);
    const velocityRef = useRef(getRandomVelocity(boardSize, ballXVelocityVariable));
    const positionRef = useRef(position);
    const animationFrameRef = useRef<number>();

    const updatePosition = useCallback(() => {
        if (gameState.isPaused) {
            return;
        }

        const newPos = {
            x: positionRef.current.x + velocityRef.current.x,
            y: positionRef.current.y + velocityRef.current.y
        };

        if (newPos.y <= 0 || newPos.y + diameter >= boardSize.height) {
            velocityRef.current.y *= -1;
            newPos.y = newPos.y <= 0 ? 0 : boardSize.height - diameter;
        }

        if (newPos.x <= 0 || newPos.x + diameter >= boardSize.width) {
            setGameState((prevState) => {
                const updatedScore = {
                    ...prevState.score,
                    player1: newPos.x + diameter >= boardSize.width ? prevState.score.player1 + 1 : prevState.score.player1,
                    player2: newPos.x <= 0 ? prevState.score.player2 + 1 : prevState.score.player2,
                };

                const winner = updatedScore.player1 === 10 ? 1 : updatedScore.player2 === 10 ? 2 : null;
                if (winner) {
                    return {
                        ...prevState,
                        isPaused: true,
                        score: {
                            ...updatedScore,
                            winner: winner
                        }
                    };
                }

                velocityRef.current = getRandomVelocity(boardSize, ballXVelocityVariable);
                positionRef.current = initialPosition;
                return {
                    ...prevState,
                    score: updatedScore
                };
            });
        } else {
            setPosition(newPos);
            positionRef.current = newPos;
        }

        animationFrameRef.current = requestAnimationFrame(updatePosition);
    }, [boardSize, diameter, gameState, setGameState, initialPosition, ballXVelocityVariable]);

    useEffect(() => {
        positionRef.current = initialPosition;
        setPosition(initialPosition);
        velocityRef.current = getRandomVelocity(boardSize, ballXVelocityVariable);
    }, [boardSize, initialPosition, ballXVelocityVariable]);

    useEffect(() => {
        if (!gameState.isPaused) {
            animationFrameRef.current = requestAnimationFrame(updatePosition);
        }

        return () => {
            cancelAnimationFrame(animationFrameRef.current!);
        };
    }, [updatePosition, gameState.isPaused]);

    useEffect(() => {
        paddles.forEach((paddle, index) => {
            const newPos = {
                x: positionRef.current.x + velocityRef.current.x,
                y: positionRef.current.y + velocityRef.current.y
            };

            if (checkPaddleCollision(paddle, newPos, diameter, index)) {
                velocityRef.current.x *= -1;
                setPosition(newPos);
                positionRef.current = newPos;
            }
        });
    }, [paddles, diameter]);

    return {
        position,
        diameter
    };
};
