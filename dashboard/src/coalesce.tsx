const coalesce = <T,>(defaultVal: T, ...args: (T | null | undefined)[]): T => {
  for (const arg of args) {
    if (arg !== null && arg !== undefined) {
      return arg;
    }
  }
  return defaultVal;
};

export default coalesce;
