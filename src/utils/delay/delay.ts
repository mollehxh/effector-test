type Config<T> = {
  ms: number;
  value?: T;
  shouldFail?: boolean;
};

export function delay<T>(
  ms: number,
  value?: T,
  shouldFail?: boolean
): Promise<T>;
export function delay<T>(config: Config<T>): Promise<T>;
export function delay(...args: any[]) {
  const config: Config<any> =
    typeof args[0] === 'number'
      ? {
          ms: args[0],
          value: args[1],
          shouldFail: args[2],
        }
      : args[0];

  const { value, shouldFail, ms } = config;

  return new Promise((rs, rj) => setTimeout(shouldFail ? rj : rs, ms, value));
}
