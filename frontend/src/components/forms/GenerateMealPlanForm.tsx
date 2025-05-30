"use client";

import { useEffect, useState } from "react";
import { Input } from "src/components/common/Input";
import { Select } from "src/components/common/Select";
import { useGenerateMealPlan } from "src/hooks/pages/diet/useGenerateMealPlan";

const ingredientCategories = [
  { id: 0, value: "" },
  { id: 1, value: "meat" },
  { id: 2, value: "dairy" },
  { id: 3, value: "vegetables" },
  { id: 4, value: "fruits" },
  { id: 5, value: "grains" },
  { id: 6, value: "legumes" },
  { id: 7, value: "nuts/seeds" },
  { id: 8, value: "oils/fats" },
  { id: 9, value: "spices/herbs" },
  { id: 10, value: "sweeteners" },
  { id: 11, value: "alcohol" },
  { id: 12, value: "seafood" },
  { id: 13, value: "eggs" },
];

export const GenerateMealPlanForm = () => {
  const { control, isValid, handleSubmit } = useGenerateMealPlan();

  return (
    <>
      <form
        className="mb-[16px] flex flex-col gap-[16px] mx-auto w-[480px] sm:w-full"
        onSubmit={handleSubmit}
      >
        <Input
          name="calories"
          label="Calories *"
          control={control}
          rules={{ required: true }}
          type="text"
          placeholder="Calories"
        />

        <Input
          name="protein"
          label="Protein *"
          control={control}
          rules={{ required: true }}
          type="text"
          placeholder="Protein"
        />

        <Input
          name="carbs"
          label="Carbohydrates *"
          control={control}
          rules={{ required: true }}
          type="text"
          placeholder="Carbohydrates"
        />

        <Input
          name="fat"
          label="Fat *"
          control={control}
          rules={{ required: true }}
          type="text"
          placeholder="Fat"
        />

        <Select
          name="excludedIngredientCategories"
          label="Excluded ingredient categories"
          control={control}
          options={ingredientCategories}
          optionValue="value"
        />

        <button
          type="submit"
          disabled={!isValid}
          className="px-[30px] py-[8px] mx-auto w-[280px] sm:w-full rounded-lg text-base md:text-lg bg-emerald-500 text-white"
        >
          Generate
        </button>
      </form>
    </>
  );
};
