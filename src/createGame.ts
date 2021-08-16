import { createEffect, createEvent, forward, sample } from 'effector';
import { config } from './config';
import { GridModel } from './createGrid';
import { SnakeModel } from './createSnake';
import { coordinatesToArray, coordinatesToString } from './utils';
import { delay } from './utils/delay';

type Config = {
  snake: SnakeModel;
  grid: GridModel;
};

export const createGame = ({ grid, snake }: Config) => {
  const tick = createEffect(() => delay({ ms: config.tickLength }));
  const start = createEvent();
  const stop = createEvent();

  forward({ from: start, to: tick });
  forward({ from: tick.doneData, to: tick });

  const snakeMoved = sample({
    source: { snake: snake.body, direction: snake.direction },
    clock: tick.done,
    fn: ({ snake, direction }) => {
      const head = coordinatesToArray(snake[0]);
      if (direction === 'up') {
        head[0] -= 1;
      }
      if (direction === 'down') {
        head[0] += 1;
      }
      if (direction === 'left') {
        head[1] -= 1;
      }
      if (direction === 'right') {
        head[1] += 1;
      }
      return [coordinatesToString(head), ...snake].slice(0, -1);
    },
  });

  forward({ from: snakeMoved, to: snake.setBodyCoordinates });

  return {
    start,
    stop,
  };
};
