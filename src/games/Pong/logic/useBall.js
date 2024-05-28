import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const getVelocityMagnitude = (boardSize) => {
    return Math.sqrt((boardSize.width ** 2 + boardSize.height ** 2)) * 0.005;
};

const getRandomVelocity = (boardSize, ballXVelocityVariable) => {
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

const checkPaddleCollision = (paddle, ballPos, diameter) => {
    return ballPos.x + diameter >= paddle.position.x &&
        ballPos.x <= paddle.position.x + paddle.size.width &&
        ballPos.y + diameter >= paddle.position.y &&
        ballPos.y <= paddle.position.y + paddle.size.height;
};

const useBall = (boardSize, paddles, gameState, setGameState) => {
    let ballXVelocityVariable = 0.707;
    let ballDiameterVariable = 0.035;
    switch (gameState.dificulty) {
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

    const diameter = useMemo(() => Math.round(boardSize.height * ballDiameterVariable), [boardSize.height, ballDiameterVariable]);
    const initialPosition = useMemo(() => ({
        x: boardSize.width / 2 - diameter / 2,
        y: boardSize.height / 2 - diameter / 2,
    }), [boardSize.width, boardSize.height, diameter]);

    const [position, setPosition] = useState(initialPosition);
    const velocityRef = useRef(getRandomVelocity(boardSize, ballXVelocityVariable));
    const positionRef = useRef(position);
    const animationFrameRef = useRef();

    const updatePosition = useCallback(() => {
        if (gameState.isPaused) {
            return;
        }

        let newPos = {
            x: positionRef.current.x + velocityRef.current.x,
            y: positionRef.current.y + velocityRef.current.y
        };

        if (newPos.y <= 0 + diameter || newPos.y >= boardSize.height - diameter) {
            velocityRef.current.y *= -1;
            newPos.y = positionRef.current.y + velocityRef.current.y;
        }

        if (newPos.x <= 0 || newPos.x >= boardSize.width) {
            setGameState((prevState) => {
                const updatedScore = {
                    ...prevState.score,
                    player1: newPos.x >= boardSize.width - diameter ? prevState.score.player1 + 1 : prevState.score.player1,
                    player2: newPos.x <= 0 + diameter ? prevState.score.player2 + 1 : prevState.score.player2,
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
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [updatePosition, gameState.isPaused]);

    useEffect(() => {
        paddles.forEach((paddle, index) => {
            let newPos = {
                x: positionRef.current.x + velocityRef.current.x,
                y: positionRef.current.y + velocityRef.current.y
            };

            if (checkPaddleCollision(paddle, newPos, diameter, index === 0 ? 1 : -1)) {
                velocityRef.current.x = -velocityRef.current.x;
            }
        });
    }, [paddles, diameter]);

    return {
        position,
        diameter
    };
};

export default useBall;