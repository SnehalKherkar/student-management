import { useState, useEffect, useCallback } from "react";
import { storage } from "../api/storage";

export const useLocalStorageState = (key, defaultValue = null) => {
  const [state, setState] = useState(() => storage.get(key) ?? defaultValue);

  useEffect(() => {
    storage.set(key, state);
  }, [key, state]);

  const updateState = useCallback((value) => {
    setState(value);
    storage.set(key, value);
  }, []);

  const clearState = useCallback(() => {
    setState(null);
    storage.remove(key);
  }, []);

  return {
    state,
    setState: updateState,
    clearState,
  };
};
