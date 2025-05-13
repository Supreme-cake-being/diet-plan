import { useEffect } from "react";
import { useGet } from "src/hooks/base/useGet";

export const useVerify = (verificationToken: string, onSuccess: () => void) => {
  const { data, loading } = useGet(`users/verify/${verificationToken}`);

  useEffect(() => {
    if (data) {
      localStorage.removeItem("email");
      onSuccess();
    }
  }, [data]);

  return { data, loading };
};
