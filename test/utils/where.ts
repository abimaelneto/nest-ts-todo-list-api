export const whereFn =
  <T>(where: T) =>
  (item: T) => {
    let match = true;
    for (const k in where) {
      if (where[k] != item[k]) match = false;
    }
    return match;
  };
