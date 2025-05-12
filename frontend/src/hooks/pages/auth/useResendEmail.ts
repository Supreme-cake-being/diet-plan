import { usePost } from "src/hooks/base/usePost";

export const useResendEmail = () => {
  const { handlePost } = usePost("users/verify");

  const handleResendEmail = async () => {
    const email = localStorage.getItem("email");

    await handlePost({ email });
  };

  return { handleResendEmail };
};
