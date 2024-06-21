export type GameState = {
    score: number;
    hasStarted: boolean;
    isPaused: boolean;
    difficulty: number | null;
  }

export type SetSnake = {
    col: number;
    row: number;
}