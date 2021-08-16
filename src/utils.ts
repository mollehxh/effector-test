export const coordinatesToString = (coordinates: [number, number]) => {
  return `${coordinates[0]}:${coordinates[1]}`;
};

export const coordinatesToArray = (coordinates: string) => {
  return coordinates.split(':').map(Number) as [number, number];
};

export const createSnakeCoordinates = ({
  length,
  startCoordinates,
}: {
  length: number;
  startCoordinates: string;
}) => {
  const startCoordinatesTuple = coordinatesToArray(startCoordinates);
  const parts = {
    head: '',
    tail: '',
  };

  const coordinates = Array.from({ length }).map((_, k) =>
    coordinatesToString([
      startCoordinatesTuple[0] + k,
      startCoordinatesTuple[1],
    ])
  );

  return coordinates;
};
