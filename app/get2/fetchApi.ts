import { useState } from 'react';

const fetchApi = <T,>(url: string, triggerFetch: boolean): { data: T | null; loading: boolean; error: string | null; refetch: () => void } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }
      const json = await response.json();
      setData(json as T);
      console.log(json);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (triggerFetch) {
    fetchData();
    triggerFetch = false;
  }

  return { data, loading, error, refetch: fetchData };
};

export default fetchApi;
