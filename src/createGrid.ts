import { createEvent, createStore } from 'effector';
import { coordinatesToString } from './utils';

type Config = {
  size: number;
};

export const createGrid = ({ size }: Config) => {
  const $bounties = createStore<Record<string, boolean>>({});
  const addBounty = createEvent();
  const bountyConsumed = createEvent<string>();

  $bounties
    .on(addBounty, state => ({
      ...state,
      [coordinatesToString([randomCoordinate(size), randomCoordinate(size)])]:
        true,
    }))
    .on(bountyConsumed, (state, coordinates) => ({
      ...state,
      [coordinates]: false,
    }));

  return {
    bounties: $bounties,
    addBounty,
    bountyConsumed,
    meta: {
      size,
    },
  };
};

export type GridModel = ReturnType<typeof createGrid>;

const randomCoordinate = (range: number) => {
  return Math.round(Math.random() * range);
};
