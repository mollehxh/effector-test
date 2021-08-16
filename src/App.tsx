import React, { useEffect } from 'react';
import { Grid } from './Grid';
import { gameModel, snakeModel } from './model';
import './styles.css';

export const App = () => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'Enter':
          return gameModel.start();

        case 'KeyA':
          return snakeModel.setDirection('left');

        case 'KeyD':
          return snakeModel.setDirection('right');

        case 'KeyW':
          return snakeModel.setDirection('up');

        case 'KeyS':
          return snakeModel.setDirection('down');

        default:
          break;
      }
    };

    document.addEventListener('keypress', handler);
    return () => document.removeEventListener('keypress', handler);
  }, []);

  return (
    <Grid
      size={8}
      snakeCoordinates={[[0, 0]]}
      bountiesCoordinates={[[1, 1]]}
    ></Grid>
  );
};
