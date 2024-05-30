import { useState } from 'react';

const useFood = () => {
    const [food, setFood] = useState({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });

    const generateFood = () => {
        setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
    };

    return { food, generateFood };
};

export default useFood;