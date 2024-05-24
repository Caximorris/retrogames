import {useState, useEffect, useRef, useMemo} from 'react';

const getRandomVelocity = (boardSize) => {
    const magnitude = Math.sqrt((boardSize.width ** 2 + boardSize.height ** 2)) * 0.0025;
    const xVelocity = 4;
    const xDirection = Math.random() > 0.5 ? 1 : -1;
    const angle = Math.random() * 2 * Math.PI;
    return {
        x: xVelocity * xDirection,
        y: magnitude * Math.sin(angle)
    };
};

const checkPaddleCollision = (paddle, ballPos, diameter) => {
    return ballPos.x + diameter >= paddle.position.x &&
        ballPos.x <= paddle.position.x + paddle.size.width &&
        ballPos.y + diameter >= paddle.position.y &&
        ballPos.y <= paddle.position.y + paddle.size.height;
};

const useBall = (boardSize, paddles, gameState, setGameState) => {
    const diameter = useMemo(() => Math.round(boardSize.height * 0.05), [boardSize.height]);
    const [position, setPosition] = useState({
        x: boardSize.width / 2 - diameter / 2,
        y: boardSize.height / 2 - diameter / 2
    });

    const velocityRef = useRef(getRandomVelocity(boardSize, diameter));
    const positionRef = useRef(position);
    const animationFrameRef = useRef();

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

    useEffect(() => {
        const updatePosition = () => {
            if (gameState.isPaused) {
                animationFrameRef.current = requestAnimationFrame(updatePosition);
                return;
            }
            let newPos = {
                x: positionRef.current.x + velocityRef.current.x,
                y: positionRef.current.y + velocityRef.current.y
            };

            if (newPos.y <= 0 || newPos.y >= boardSize.height) {
                velocityRef.current.y *= -1;
                newPos.y = positionRef.current.y + velocityRef.current.y;
            }

            if (newPos.x <= 0 || newPos.x >= boardSize.width) {
                if (newPos.x <= 0) {
                    setGameState((prevState) => ({
                        ...prevState,
                        score: {
                            ...prevState.score,
                            player2: prevState.score.player2 + 1
                        }
                    }));
                }
                if (newPos.x >= boardSize.width) {
                    setGameState((prevState) => ({
                        ...prevState,
                        score: {
                            ...prevState.score,
                            player1: prevState.score.player1 + 1
                        }
                    }));
                }
                gameState.score.winner = gameState.score.player1 === 10 ? 1 : gameState.score.player2 === 10 ? 2 : null;
                velocityRef.current = getRandomVelocity(boardSize);
                newPos = {
                    x: boardSize.width / 2 - diameter / 2,
                    y: boardSize.height / 2 - diameter / 2
                };
            }

            setPosition(newPos);
            positionRef.current = newPos;
            animationFrameRef.current = requestAnimationFrame(updatePosition);
        };

        updatePosition();

        return () => {
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [boardSize, diameter, gameState, setGameState]);

    return {
        position,
        diameter
    };
};

export default useBall;
