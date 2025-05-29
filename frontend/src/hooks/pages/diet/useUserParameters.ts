import { useForm } from "react-hook-form";
import { usePut } from "src/hooks/base/usePut";

interface IUserParameters {
  user: Record<string, any>;
}

interface ISignup {
  name: string;
  age: number;
  gender: "male" | "female";
  weight: number;
  height: number;
}

export const useUserParameters = ({ user }: IUserParameters) => {
  const { loading, handlePut } = usePut("users/edit-info");

  const {
    control,
    formState: { errors, isValid, isLoading },
    handleSubmit,
    setError,
  } = useForm<ISignup>({
    defaultValues: {
      name: user.name || "",
      age: user.age || 1,
      gender: user.gender || "male",
      weight: user.weight || 1,
      height: user.height || 1,
    },
    mode: "onChange",
  });

  const onSubmit = async (values: ISignup) => {
    const { name, age, gender, weight, height } = values;

    const { data, error } = await handlePut({
      name,
      age,
      gender,
      weight,
      height,
    });

    if (error) {
      console.log("User parameters update error:", error);
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
