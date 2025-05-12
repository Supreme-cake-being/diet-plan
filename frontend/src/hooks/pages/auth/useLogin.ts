import { useForm } from "react-hook-form";
import { usePost } from "src/hooks/base/usePost";

interface ILogin {
  email: string;
  password: string;
}

export const useLogin = (onSuccess: () => void) => {
  const { loading, handlePost } = usePost();

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

    await handlePost({
      email,
      password,
    });
    onSuccess();
  };

  return {
    loading,
    control,
    isValid,
    isLoading,
    errors,
    handleSubmit,
    onSubmit,
  };
};
