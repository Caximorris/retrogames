function initializeGame() {
    return {
        ball: {
            position: {
                x: 50,
                y: 50
            },
            direction: {
                x: Math.random() > 0.5 ? 1 : -1,
                y: Math.random() > 0.5 ? 1 : -1
            }
        },
        score: {
            player1: 0,
            player2: 0,
            winner: null
        }
    }
}

function moveBall(ball, player1, player2) {
    const newBall = {
        x: ball.x + ball.dx,
        y: ball.y + ball.dy,
        dx: ball.dx,
        dy: ball.dy
    }

    if (newBall.y <= 0 || newBall.y >= 100) {
        newBall.dy = -ball.dy
    }

    if (newBall.x <= 0) {
        if (newBall.y >= player1.y && newBall.y <= player1.y + 20) {
            newBall.dx = -ball.dx
        } else {
            return null
        }
    }

    if (newBall.x >= 100) {
        if (newBall.y >= player2.y && newBall.y <= player2.y + 20) {
            newBall.dx = -ball.dx
        } else {
            return null
        }
    }

    return newBall
}



export {
    initializeGame,
    moveBall
}