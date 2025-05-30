"use client";

import { MealItem } from "src/components/common/MealItem";

interface IMealsList {
  meals: Record<string, string | number>[];
}

export const MealsList = ({ meals }: IMealsList) => {
  return (
    <div className="flex sm:flex-col mx-auto w-[480px] sm:w-full">
      <ul className="mt-[24px] w-full">
        <h1 className="font-semibold text-3xl md:text-4xl lg:text-5xl mb-[16px]">
          Meals
        </h1>

        <div className="flex flex-col gap-[16px] divide-y divide-[hsl(205, 30%, 88%)]">
          {meals?.map(
            (
              { id, name, calories, protein, carbs, fat, countryOrigin },
              index
            ) => (
              <MealItem
                key={id}
                meal={{
                  id,
                  name,
                  calories,
                  protein,
                  carbs,
                  fat,
                  countryOrigin,
                }}
              />
            )
          )}
        </div>
      </ul>
    </div>
  );
};
