export const isEmpty = (...args) => {
  const empty = args.some((arg) => {
    if (
      arg === null ||
      arg === undefined ||
      arg === false ||
      arg === "" ||
      arg.length === 0
    ) {
      return true;
    } else {
      return false;
    }
  });
  return empty;
};
