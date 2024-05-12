import {useState, useEffect, useRef, useMemo} from 'react';

const getRandomVelocity = (boardSize) => {
    const magnitude = Math.sqrt((boardSize.width ** 2 + boardSize.height ** 2)) * 0.0025;
    const angle = Math.random() * 2 * Math.PI;
    return {
        x: magnitude * Math.cos(angle),
        y: magnitude * Math.sin(angle)
    };
};

const checkPaddleCollision = (paddle, ballPos, diameter) => {
    return ballPos.x + diameter >= paddle.position.x &&
        ballPos.x <= paddle.position.x + paddle.size.width &&
        ballPos.y + diameter >= paddle.position.y &&
        ballPos.y <= paddle.position.y + paddle.size.height;
};

const useBall = (boardSize, paddles) => {
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
    }, [paddles]);

    useEffect(() => {
        const updatePosition = () => {
            let newPos = {
                x: positionRef.current.x + velocityRef.current.x,
                y: positionRef.current.y + velocityRef.current.y
            };

            if (newPos.y <= 0 || newPos.y >= boardSize.height) {
                velocityRef.current.y *= -1;
                newPos.y = positionRef.current.y + velocityRef.current.y;
            }

            if (newPos.x <= 0 || newPos.x >= boardSize.width) {
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
    }, [boardSize]);

    return {
        position,
        diameter
    };
};

export default useBall;
