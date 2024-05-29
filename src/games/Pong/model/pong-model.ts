export type GameState = {
  score: {
    player1: number;
    player2: number;
    winner: number | null;
  };
  hasStarted: boolean;
  isPaused: boolean;
  difficulty: number | null;
  gameMode: string | null;
}

export type Paddle = {
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
}