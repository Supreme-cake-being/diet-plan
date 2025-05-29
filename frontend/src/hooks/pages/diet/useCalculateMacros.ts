import { useForm } from "react-hook-form";
import { usePost } from "src/hooks/base/usePost";

interface ICalculateMacros {
  dailyActivityLevel:
    | "sedentary"
    | "lightlyActive"
    | "moderatelyActive"
    | "veryActive"
    | "extremelyActive";
  goal: "lose" | "maintain" | "gain";
  preferredDiet: "balanced" | "lowCarb" | "highProtein";
}

export const useCalculateMacros = (onSuccess: () => void) => {
  const { loading, handlePost } = usePost("diet/calculate-macros");

  const {
    control,
    formState: { errors, isValid, isLoading },
    handleSubmit,
  } = useForm<ICalculateMacros>({
    defaultValues: {
      dailyActivityLevel: "sedentary",
      goal: "lose",
      preferredDiet: "balanced",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: ICalculateMacros) => {
    const { dailyActivityLevel, goal, preferredDiet } = values;

    const { data, error } = await handlePost({
      dailyActivityLevel,
      goal,
      preferredDiet,
    });

    if (error) {
      console.log("Calculate macros error:", error);
      return;
    }

    localStorage.setItem("macros", JSON.stringify(data));

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
