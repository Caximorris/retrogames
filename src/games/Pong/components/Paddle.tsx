import {FC} from "react";

type PaddleProps = {
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
}

const Paddle: FC<PaddleProps> = ({position, size}) => {

    return (
        <div
            className="paddle"
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

export default Paddle;
