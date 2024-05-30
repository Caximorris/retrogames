import {FC} from "react";

type SnakePlayerProps = {
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
}

const SnakePlayer: FC<SnakePlayerProps> = ({position, size}) => {

    return (
        <div
            className="snake-player"
            style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
                position: 'absolute',
                width: `${size.width}px`,
                height: `${size.height}px`,
                backgroundColor: 'white',
            }}
        />
    );
}

export default SnakePlayer;
