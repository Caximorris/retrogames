import {GameState} from "../model/snake-model";

function initializeGame(): GameState {
    return {
        score: 0,
        hasStarted: false,
        isPaused: true,
        difficulty: null,
    }
}

export {
    initializeGame
}