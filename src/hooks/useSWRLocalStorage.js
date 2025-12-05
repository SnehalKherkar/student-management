import useSWR from 'swr';
import { storage } from '../api/storage';

const fetcher = (key) => {
  return storage.get(key);
};

export function useSWRLocalStorage(key, config) {
  const { data, error, isLoading, mutate } = useSWR(key, fetcher, config);

  const update = async (newData) => {
    storage.set(key, newData);
    return mutate(newData, false);
  };

  return {
    data,
    error,
    isLoading,
    update,
  };
}
