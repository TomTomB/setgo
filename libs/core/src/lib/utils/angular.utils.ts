export const assertInputsAreProvided = (args: Record<string, unknown>) => {
  for (const argKey of Object.keys(args)) {
    if (args[argKey] === undefined) {
      throw new Error(`The required input ${[argKey]} was not provided`);
    }
  }
};
