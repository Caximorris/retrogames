import {FC} from "react";

type SnakePlayerProps = {
    snake: [{ x: number, y: number }]
}

const SnakePlayer: FC<SnakePlayerProps> = ({ snake }) => {
        return (
            <>
                {snake.map((segment, index) => (
                    <div
                        key={index}
                        className="snake-segment"
                        style={{ left: `${segment.x * 20}px`, top: `${segment.y * 20}px` }}
                    ></div>
                ))}
            </>
        );
    };

export default SnakePlayer;
