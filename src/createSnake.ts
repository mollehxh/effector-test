import { createEvent, createStore, guard, restore, sample } from 'effector';
import { Direction } from './types/Directrion';
import { createSnakeCoordinates } from './utils';

type Config = {
  length: number;
  startCoordinates: string;
};

export const createSnake = ({ length, startCoordinates }: Config) => {
  const coordinates = createSnakeCoordinates({
    length,
    startCoordinates,
  });

  const $length = createStore(length);
  const setDirection = createEvent<Direction>();
  const $direction = createStore<Direction>('up');

  const setBodyCoordinates = createEvent<string[]>();
  const $body = restore(setBodyCoordinates, coordinates);
  const $bodyMap = $body.map(body =>
    Object.fromEntries(body.map(coord => [coord, true]))
  );

  const directionSet = guard(
    sample($direction, setDirection, (curr, next) => ({ curr, next })),
    {
      filter: ({ curr, next }) => {
        return !invalidDirectionChanged.some(
          directions => curr === directions[0] && next === directions[1]
        );
      },
    }
  ).map(({ next }) => next);

  $direction.on(directionSet, (_, v) => v);

  return {
    direction: $direction,
    length: $length,
    body: $body,
    setBodyCoordinates,
    setDirection,
    meta: {
      bodyMap: $bodyMap,
    },
  };
};

const invalidDirectionChanged = [
  ['right', 'left'],
  ['left', 'right'],
  ['down', 'up'],
  ['up', 'down'],
];

export type SnakeModel = ReturnType<typeof createSnake>;
