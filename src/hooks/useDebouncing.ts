/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useRef } from "react";

type CallbackFunction = (...args: unknown[]) => void;

function useDebouncing(
  callback: CallbackFunction,
  delay: number
): CallbackFunction {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: unknown[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay]);

  return debouncedCallback;
}

export default useDebouncing;
