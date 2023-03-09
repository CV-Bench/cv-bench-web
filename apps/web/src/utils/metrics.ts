export const reorderObjects = <T extends string | number | symbol>(
  objects: any
): Record<T, [number, number, number]> =>
  Object.keys(objects[0]).reduce((all, key) => {
    return {
      ...all,
      [key]: [objects[0][key], objects[1][key], objects[2][key]]
    };
  }, {} as Record<T, [number, number, number]>);
