function initializeGame() {
    return {
        score: {
            player1: 0,
            player2: 0,
            winner: null
        },
        hasStarted: false,
        isPaused: true,
        dificulty: null,
        AIplayer: null
    }
}

export {
    initializeGame
}