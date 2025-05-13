import { useForm } from "react-hook-form";
import { usePost } from "src/hooks/base/usePost";

interface IForgotPassword {
  email: string;
}

export const useForgotPassword = () => {
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
