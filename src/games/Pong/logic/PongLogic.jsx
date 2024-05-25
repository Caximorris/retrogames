function initializeGame() {
    return {
        score: {
            player1: 0,
            player2: 0,
            winner: null
        },
        isPaused: true
    }
}

export {
    initializeGame
}