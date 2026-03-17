export const shuffledNumbers = (start: number, end: number): number => {
  // Generate a random number between start and end (inclusive)
  return Math.floor(Math.random() * (end - start + 1)) + start;
};
