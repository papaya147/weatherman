import { useEffect, useState } from "react";
import ErrorModel from "./model/ErrorModel";

interface FetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: ErrorModel | null;
}

const useFetch = <T,>(endpoint: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorModel | null>(null);

  useEffect(() => {
    fetch(endpoint)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const d = data as T;
        const err = data as ErrorModel;
        if (!err.message) setData(d);
        else setError(err);
        setIsLoading(false);
      });
  }, [endpoint]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetch;
