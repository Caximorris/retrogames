import { useState } from 'react';

const useFood = (size: number) => {
    const [food, setFood] = useState({ col: Math.floor(Math.random() * size), row: Math.floor(Math.random() * size) });

    const generateFood = () => {
        setFood({ col: Math.floor(Math.random() * size), row: Math.floor(Math.random() * size) });
    };

    return { food, generateFood };
};

export default useFood;