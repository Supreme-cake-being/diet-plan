import { useForm } from "react-hook-form";
import { usePost } from "src/hooks/base/usePost";

interface IRestorePassword {
  password: string;
  reenteredPassword: string;
}

export const useRestorePassword = (
  restorationToken: string,
  onSuccess: () => void
) => {
  const { loading, handlePost } = usePost(`users/restore/${restorationToken}`);

  const {
    control,
    formState: { errors, isValid, isLoading },
    handleSubmit,
    setError,
  } = useForm<IRestorePassword>({
    defaultValues: {
      password: "",
      reenteredPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: IRestorePassword) => {
    const { password, reenteredPassword } = values;

    if (password !== reenteredPassword) {
      setError("reenteredPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    const { data, error } = await handlePost({
      password,
    });

    if (error) {
      console.log("Restore password failed:", error);
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
