import axios from "axios";
import { useState } from "react";

export const useDelete = (endpoint = "") => {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        process.env.NEXT_PUBLIC_API + `/${endpoint}`
      );
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { data: data?.data, loading, handleDelete };
};
