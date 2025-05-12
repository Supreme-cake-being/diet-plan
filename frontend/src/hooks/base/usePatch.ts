import axios from "axios";
import { useState } from "react";

export const usePatch = (endpoint = "") => {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePatch = async (values: Record<string, any>) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        process.env.NEXT_PUBLIC_API + `${endpoint}`,
        values
      );
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { data: data?.data, loading, handlePatch };
};
