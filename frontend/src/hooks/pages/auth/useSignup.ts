import { useForm } from "react-hook-form";
import { usePost } from "src/hooks/base/usePost";

interface ISignup {
  email: string;
  name: string;
  password: string;
  reenteredPassword: string;
}

export const useSignup = (onSuccess?: () => void) => {
  const { loading, handlePost } = usePost("users/signup");

  const {
    control,
    formState: { errors, isValid, isLoading },
    handleSubmit,
    watch,
    setError,
  } = useForm<ISignup>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      reenteredPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: ISignup) => {
    const { email, name, password, reenteredPassword } = values;

    if (password !== reenteredPassword) {
      setError("reenteredPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    const { data, error } = await handlePost({
      email,
      name,
      password,
    });

    if (error) {
      console.log("Signup failed:", error);
      return;
    }

    localStorage.setItem("email", data.email);

    onSuccess && onSuccess();
  };

  return {
    loading,
    control,
    isValid,
    isLoading,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    watch,
  };
};
