import axios from "axios";
import { useForm } from "react-hook-form";
import { usePost } from "src/hooks/base/usePost";

interface ILogin {
  email: string;
  password: string;
}

export const useLogin = (onSuccess: () => void) => {
  const { loading, handlePost } = usePost("users/login");

  const {
    control,
    formState: { errors, isValid, isLoading },
    handleSubmit,
  } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: ILogin) => {
    const { email, password } = values;

    const { data, error } = await handlePost(
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    if (error || !data?.token) {
      console.log("Login failed:", error);
      return;
    }

    axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    onSuccess();
  };

  return {
    loading,
    control,
    isValid,
    isLoading,
    errors,
    handleSubmit: handleSubmit(onSubmit),
  };
};
