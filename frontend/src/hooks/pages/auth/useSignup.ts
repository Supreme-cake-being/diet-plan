import { useForm } from "react-hook-form";
import { usePost } from "src/hooks/base/usePost";

interface ISignup {
  email: string;
  password: string;
  reenteredPassword: string;
}

export const useSignup = (onSuccess: () => void) => {
  const { loading, handlePost } = usePost();

  const {
    control,
    formState: { errors, isValid, isLoading },
    handleSubmit,
  } = useForm<ISignup>({
    defaultValues: {
      email: "",
      password: "",
      reenteredPassword: "",
    },
  });

  const onSubmit = async (values: ISignup) => {
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
