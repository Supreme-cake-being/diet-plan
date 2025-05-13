import { useForm } from "react-hook-form";
import { usePost } from "src/hooks/base/usePost";

interface IForgotPassword {
  email: string;
}

export const useForgotPassword = (onSuccess: () => void) => {
  const { loading, handlePost } = usePost("users/forgot-password");

  const {
    control,
    formState: { errors, isValid, isLoading },
    handleSubmit,
  } = useForm<IForgotPassword>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: IForgotPassword) => {
    const { email } = values;

    const { data, error } = await handlePost({
      email,
    });

    if (error || !data?.token) {
      console.log("Forgot password failed:", error);
      return;
    }

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
