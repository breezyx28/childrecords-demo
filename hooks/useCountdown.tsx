import { useState, useEffect, useCallback } from "react";

export function useCountdown(start: number) {
  const [count, setCount] = useState(start);
  const [isRunning, setIsRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  const startCount = useCallback(() => {
    setCount(start); // Reset count to the starting value
    setIsRunning(true);
    setFinished(false);
  }, [start]);

  const onFinish = useCallback(() => {
    setFinished(true);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (!isRunning || count <= 0) {
      if (count <= 0) onFinish(); // Mark the countdown as finished
      return;
    }

    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, count, onFinish]);

  return { count, onFinish: finished, startCount, isRunning };
}
