import axios from "axios";
import { useState } from "react";

export const usePatch = (endpoint = "") => {
  const [loading, setLoading] = useState(false);

  const handlePatch = async (
    values: Record<string, any>
  ): Promise<{ data: any; error: any }> => {
    setLoading(true);
    try {
      const response = await axios.patch(
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

  return { loading, handlePatch };
};
