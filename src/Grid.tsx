import React, { useMemo } from 'react';
import { Tile } from './Tile';
import { coordinatesToString } from './utils';

type Props = {
  size: number;
  snakeCoordinates: [number, number][];
  bountiesCoordinates: [number, number][];
};

export const Grid = ({ size }: Props) => {
  const tiles = useMemo(
    () =>
      Array.from({ length: size ** 2 }).map((_, k) =>
        coordinatesToString([(k - (k % size)) / size, k % size])
      ),
    [size]
  );

  return (
    <div
      className='grid'
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
      }}
    >
      {tiles.map(coordinates => (
        <Tile key={coordinates} coordinates={coordinates} />
      ))}
    </div>
  );
};
