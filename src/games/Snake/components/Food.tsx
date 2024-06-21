import {FC} from "react";
interface FoodProps {
    position: {
        col: number;
        row: number;
    };
    cellSize: number;
}

const Food: FC<FoodProps> = ({ position, cellSize }) => {
    return (
        <div className="food" style={{
            top: `${position.row}px`,
            left: `${position.col}px`,
            position: 'absolute',
            width: `${cellSize}px`,
            height: `${cellSize}px`,
        }} />
    );
};

export default Food;