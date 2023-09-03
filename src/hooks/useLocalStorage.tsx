/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

'use client';

import { useEffect, useState } from 'react';

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T | ((prop: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const item = window.localStorage.getItem(key);
    if (item) {
      setStoredValue(JSON.parse(item) as T);
    }
    // eslint-disable-next-line
  }, []);

  const setValue = (value: T | ((prop: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
};
