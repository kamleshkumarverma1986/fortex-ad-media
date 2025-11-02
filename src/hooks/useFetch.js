import { useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (options) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(url, {
        ...options,
        cache: "no-cache",
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      setIsLoading(false);
      setData(json);
      setError(null);
    } catch (error) {
      setError({
        isSuccess: false,
        message: error.message,
      });
      setIsLoading(false);
    }
  };

  return [callApi, isLoading, data, error];
};
