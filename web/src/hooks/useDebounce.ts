import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 500, minLength = 3): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (typeof value === 'string' && value.length < minLength) {
      setDebouncedValue(value as T);
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay, minLength]);

  return debouncedValue;
}