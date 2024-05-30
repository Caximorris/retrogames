import {FC} from "react";

type BallProps = {
    position: { x: number, y: number },
    diameter: number
}

const Ball: FC<BallProps> = ({position, diameter}) => {
    return (
        <div
            className="food"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                position: 'absolute',
                width: `${diameter}px`,
                height: `${diameter}px`,
                borderRadius: '50%',
                backgroundColor: 'white'
            }}
        />
    );
};

export default Ball;