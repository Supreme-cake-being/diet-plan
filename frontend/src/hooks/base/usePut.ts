import axios from "axios";
import { useState } from "react";

export const usePut = (endpoint = "") => {
  const [loading, setLoading] = useState(false);

  const handlePut = async (
    values?: Record<string, any>
  ): Promise<{ data: any; error: any }> => {
    setLoading(true);
    try {
      const response = await axios.put(
        process.env.NEXT_PUBLIC_API + `/${endpoint}`,
        values
      );
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  return { loading, handlePut };
};
