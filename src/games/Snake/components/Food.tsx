import {FC} from "react";

type FoodProps = {
    food: { x: number, y: number }
}

const Food: FC<FoodProps> = ({food}) => {
    return (
        <div
            className="food"
            style={{
                left: `${food.x}px`,
                top: `${food.y}px`,
            }}
        />
    );
};

export default Food;