"use client";

import { useRouter } from "next/navigation";
import { Select } from "src/components/common/Select";
import { useCalculateMacros } from "src/hooks/pages/diet/useCalculateMacros";

const dailyActivityLevels = [
  { id: 1, value: "sedentary" },
  { id: 2, value: "lightlyActive" },
  { id: 3, value: "moderatelyActive" },
  { id: 4, value: "veryActive" },
  { id: 5, value: "extremelyActive" },
];
const goals = [
  { id: 1, value: "lose" },
  { id: 2, value: "maintain" },
  { id: 3, value: "gain" },
];
const preferredDiets = [
  { id: 1, value: "balanced" },
  { id: 2, value: "lowCarb" },
  { id: 3, value: "highProtein" },
];

export const CalculateMacrosForm = () => {
  const router = useRouter();

  const onSuccess = () => router.push("/generate-meal-plan");

  const { control, isValid, handleSubmit } = useCalculateMacros(onSuccess);

  return (
    <>
      <form
        className="mb-[16px] flex flex-col gap-[16px]"
        onSubmit={handleSubmit}
      >
        <Select
          name="dailyActivityLevel"
          label="Daily activity level"
          control={control}
          rules={{ required: true }}
          options={dailyActivityLevels}
          optionValue="value"
        />

        <Select
          name="goal"
          label="Goal"
          control={control}
          rules={{ required: true }}
          options={goals}
          optionValue="value"
        />

        <Select
          name="preferredDiet"
          label="Preferred diet"
          control={control}
          rules={{ required: true }}
          options={preferredDiets}
          optionValue="value"
        />

        <button
          type="submit"
          disabled={!isValid}
          className="px-[30px] py-[8px] mx-auto w-[280px] sm:w-full rounded-lg text-base md:text-lg bg-emerald-500 text-white"
        >
          Get macros
        </button>
      </form>
    </>
  );
};
