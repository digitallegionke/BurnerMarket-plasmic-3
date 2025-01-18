import useSWR, { SWRResponse } from 'swr';
import { Recipe, DirectoryItem } from './airtable';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

interface SWRError extends Error {
  status?: number;
}

interface UseDataResponse<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: SWRError | undefined;
}

// Hook for fetching all recipes
export function useRecipes(): UseDataResponse<Recipe[]> {
  const { data, error, isValidating } = useSWR<Recipe[], SWRError>('/api/recipes', fetcher);

  return {
    data,
    isLoading: !error && !data && isValidating,
    isError: error,
  };
}

// Hook for fetching a single recipe
export function useRecipe(id: string): UseDataResponse<Recipe> {
  const { data, error, isValidating } = useSWR<Recipe, SWRError>(
    id ? `/api/recipes/${id}` : null,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data && isValidating,
    isError: error,
  };
}

// Hook for fetching all directory items
export function useDirectoryItems(): UseDataResponse<DirectoryItem[]> {
  const { data, error, isValidating } = useSWR<DirectoryItem[], SWRError>('/api/directory', fetcher);

  return {
    data,
    isLoading: !error && !data && isValidating,
    isError: error,
  };
}

// Hook for fetching a single directory item
export function useDirectoryItem(id: string): UseDataResponse<DirectoryItem> {
  const { data, error, isValidating } = useSWR<DirectoryItem, SWRError>(
    id ? `/api/directory/${id}` : null,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data && isValidating,
    isError: error,
  };
}
