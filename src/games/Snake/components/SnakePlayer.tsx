import { FC } from "react";

interface SnakePlayerProps {
    position: {
        col: number;
        row: number;
    };
    cellSize: number;
}

const SnakePlayer: FC<SnakePlayerProps> = ({ position, cellSize }) => {
    console.log(position);
    return (
        <div className="snake-segment" style={{
            top: `${position.row}px`,
            left: `${position.col}px`,
            position: 'absolute',
            width: `${cellSize}px`,
            height: `${cellSize}px`,
        }} />
    );
};

export default SnakePlayer;
