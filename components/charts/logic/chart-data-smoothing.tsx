export const smoothData = (data: (number | null)[], windowSize = 3) => {
  return data.map((_, idx, arr) => {
    const start = Math.max(0, idx - Math.floor(windowSize / 2));
    const end = Math.min(arr.length, idx + Math.ceil(windowSize / 2));
    const window = arr.slice(start, end).filter((val) => val !== null);
    if (window.length === 0) return null;
    return (
      window.reduce((sum, value) => sum + (value as number), 0) / window.length
    );
  });
};
