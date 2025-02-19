export const getObjectWithDefinedProperties = <T>(obj: Record<string, T>) => {
  const entries = Object.entries(obj);
  
  const definedEntries = entries.filter((entry): entry is [string, Exclude<T, undefined>] => entry[1] !== undefined);

  return Object.fromEntries(definedEntries);
}