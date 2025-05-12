import axios from "axios";
import { useState } from "react";

export const usePost = (endpoint = "") => {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePost = async (
    values: Record<string, any>,
    headers?: Record<string, any>
  ) => {
    setLoading(true);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API + `/${endpoint}`,
        values,
        headers
      );
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { data: data?.data, loading, handlePost };
};
