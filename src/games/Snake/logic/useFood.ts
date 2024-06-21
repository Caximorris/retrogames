import { useState } from 'react';

const useFood = (size: number) => {
    const randomPosition = () => Math.floor(Math.random() * size);
    const [food, setFood] = useState({ col: randomPosition(), row: randomPosition() });

    const generateFood = () => {
        setFood({ col: randomPosition(), row: randomPosition() });
    };

    return { food, generateFood };
};

export default useFood;