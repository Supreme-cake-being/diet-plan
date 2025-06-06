"use client";

import { IngredientItem } from "./common/IngredientItem";

interface IIngredientsList {
  ingredients: Record<string, string | number>[];
}

export const IngredientsList = ({ ingredients }: IIngredientsList) => {
  return (
    <div className="flex sm:flex-col mx-auto w-[480px] sm:w-full">
      <ul className="mt-[24px] w-full">
        <h1 className="font-semibold text-3xl md:text-4xl lg:text-5xl mb-[16px]">
          Ingredients
        </h1>

        <div className="flex flex-col gap-[16px] divide-y divide-[hsl(205, 30%, 88%)]">
          {ingredients?.map(
            ({ id, name, calories, protein, carbs, fat, category }) => (
              <IngredientItem
                key={id}
                ingredient={{
                  id,
                  name,
                  calories,
                  protein,
                  carbs,
                  fat,
                  category,
                }}
              />
            )
          )}
        </div>
      </ul>
    </div>
  );
};
