import axios from "axios";
import { useRouter } from "next/navigation";
import { usePost } from "src/hooks/base/usePost";

export const useLogout = () => {
  const { loading, handlePost } = usePost("users/logout");

  const handleLogout = async () => {
    const { error } = await handlePost({}, { withCredentials: true });

    if (error) {
      console.log("Logout failed:", error);
      return;
    }

    axios.defaults.headers.common.Authorization = "";
  };

  return { loading, handleLogout };
};
