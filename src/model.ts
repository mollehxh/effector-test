import { createStore } from 'effector';
import { config } from './config';
import { createGame } from './createGame';
import { createGrid } from './createGrid';
import { createSnake } from './createSnake';
import { Direction } from './types/Directrion';
import { createSnakeCoordinates } from './utils';

export const snakeModel = createSnake({
  length: config.snakeLength,
  startCoordinates: config.startCoordinates,
});

export const gridModel = createGrid({
  size: config.size,
});

export const gameModel = createGame({
  grid: gridModel,
  snake: snakeModel,
});
