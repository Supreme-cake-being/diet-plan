import { useEffect, useState } from "react";

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return isLoggedIn;
};
