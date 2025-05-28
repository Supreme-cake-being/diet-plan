import axios from "axios";
import { useState } from "react";

interface AxiosConfig {
  headers?: Record<string, any>;
  withCredentials?: boolean;
  [key: string]: any;
}

export const usePost = (endpoint = "") => {
  const [loading, setLoading] = useState(false);

  const handlePost = async (
    values?: Record<string, any>,
    config?: AxiosConfig
  ): Promise<{ data: any; error: any }> => {
    setLoading(true);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API + `/${endpoint}`,
        values,
        config
      );
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  return { loading, handlePost };
};
