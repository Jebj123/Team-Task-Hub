import { useState, useEffect } from 'react';

  export function useLocalStorage(key: string, defaultValue: any) {
    // Lazy initialize state from localStorage
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  });

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
