import clx from 'classnames';
import { useStoreMap } from 'effector-react';
import React from 'react';
import { snakeModel } from './model';

type Props = {
  coordinates: string;
};

export const Tile = ({ coordinates }: Props) => {
  const isSnakePart = useStoreMap({
    store: snakeModel.meta.bodyMap,
    keys: [coordinates],
    fn: snakeCoordinates => snakeCoordinates[coordinates] || false,
  });

  return (
    <div
      className={clx('tile', {
        snake: isSnakePart,
      })}
    ></div>
  );
};
