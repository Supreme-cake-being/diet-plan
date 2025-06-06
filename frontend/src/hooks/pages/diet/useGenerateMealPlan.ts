"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePost } from "src/hooks/base/usePost";

interface IMacros {
  meals?: Record<string, any>;
}

interface IGenerateMealPlan {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  excludedIngredientCategories: string;
}

export const useGenerateMealPlan = () => {
  const [data, setData] = useState<{
    meals: Record<string, string | number>[];
    total: Record<string, number>;
  }>();
  const { loading, handlePost } = usePost("diet/generate");

  useEffect(() => {
    const storedMacros = localStorage.getItem("macros");
    const storedMeals = localStorage.getItem("meals");

    if (storedMacros) {
      const macros1 = JSON.parse(storedMacros);
      Object.entries(macros1).map((entry) =>
        setValue(entry[0] as keyof IGenerateMealPlan, entry[1] as any)
      );
    }

    if (storedMeals) setData(JSON.parse(storedMeals));
  }, []);

  const {
    control,
    formState: { errors, isValid, isLoading },
    setValue,
    handleSubmit,
  } = useForm<IGenerateMealPlan>({
    defaultValues: {
      calories: 1,
      protein: 1,
      carbs: 1,
      fat: 1,
      excludedIngredientCategories: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: IGenerateMealPlan) => {
    const {
      calories,
      protein,
      carbs,
      fat,
      excludedIngredientCategories = "",
    } = values;

    const { data: response, error } = await handlePost({
      calories,
      protein,
      carbs,
      fat,
      excludedIngredientCategories: excludedIngredientCategories
        ? [excludedIngredientCategories]
        : [],
    });

    if (error) {
      console.log("Generate meal plan error:", error);
      return;
    }

    setData(response);
    localStorage.setItem("meals", JSON.stringify(response));
  };

  return {
    data,
    loading,
    control,
    isValid,
    isLoading,
    errors,
    handleSubmit: handleSubmit(onSubmit),
  };
};
