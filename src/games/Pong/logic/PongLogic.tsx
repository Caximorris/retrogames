import {GameState} from "../model/pong-model";

function initializeGame(): GameState {
    return {
        score: {
            player1: 0,
            player2: 0,
            winner: null
        },
        hasStarted: false,
        isPaused: true,
        difficulty: null,
        gameMode: null
    }
}

export {
    initializeGame
}