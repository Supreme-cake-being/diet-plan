import axios from "axios";
import { useState, useEffect, useCallback } from "react";

export const useGet = (endpoint = "") => {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGet = useCallback(async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API + `/${endpoint}`
      );
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setData(null);
    setLoading(true);
    handleGet();
  }, [endpoint]);

  return { data: data, loading };
};

export const useLazyGet = (endpoint = "") => {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGet = async (params?: Record<string, any>) => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API + `/${endpoint}`,
        {
          params,
        }
      );
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { data: data?.data, loading, handleGet };
};
