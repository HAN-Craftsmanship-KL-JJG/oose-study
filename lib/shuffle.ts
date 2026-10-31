/** Returns a new array with the items in random order. */
export function shuffle<T>(items: readonly T[]): T[] {
  return items
    .map((item) => ({ item, key: Math.random() }))
    .sort((a, b) => a.key - b.key)
    .map(({ item }) => item);
}
