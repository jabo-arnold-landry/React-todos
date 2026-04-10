import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(() => {
    const rawData = localStorage.getItem(key);
    return rawData ? (JSON.parse(rawData) as T) : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key as string, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}

export default useLocalStorage;
