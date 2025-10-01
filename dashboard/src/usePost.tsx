import { useEffect, useMemo, useState } from "react";
import ErrorModel from "./model/ErrorModel";

interface PostResult<T> {
  data: T | null;
  isLoading: boolean;
  error: ErrorModel | null;
}

interface RequestOptions {
  method?: string;
  headers?: { [key: string]: string };
  body?: string;
}

const usePost = <T,>(
  endpoint: string,
  requestBody: object,
  options?: RequestOptions
): PostResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorModel | null>(null);

  const memoReqBody = useMemo(() => JSON.stringify(requestBody), [requestBody]);
  const memoOptions = useMemo(
    () => ({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: memoReqBody,
    }),
    [options, memoReqBody]
  );

  useEffect(() => {
    const fetchOptions = memoOptions;

    fetch(endpoint, fetchOptions)
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
  }, [endpoint, memoOptions]);

  return {
    data,
    isLoading,
    error,
  };
};

export default usePost;
