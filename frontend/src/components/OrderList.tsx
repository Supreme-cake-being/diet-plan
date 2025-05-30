"use client";

import { useEffect, useState } from "react";
import { MealItem } from "./common/MealItem";
import { mealType } from "src/constants/mealType";
import Link from "next/link";

export const OrderList = () => {
  const [meals, setMeals] = useState<{
    meals: Record<string, string | number>[];
    total: Record<string, number>;
  }>();

  useEffect(() => {
    const storedMeals = localStorage.getItem("meals");
    if (storedMeals) setMeals(JSON.parse(storedMeals));
  }, []);

  return (
    <>
      <div className="flex sm:flex-col mx-auto w-[480px] sm:w-full">
        <ul className="mt-[24px] w-full">
          <h3 className="text-2xl">Your Meal Plan</h3>
          <p className="text-base">{meals?.total.calories} calories</p>

          <div className="flex flex-col gap-[16px] divide-y divide-[hsl(205, 30%, 88%)]">
            {meals?.meals.map(
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
                  mealType={mealType[index]}
                />
              )
            )}
          </div>
        </ul>
      </div>

      <div className="mt-[16px] flex justify-center gap-[16px]">
        <Link
          href="/generate-meal-plan"
          className="px-[36px] py-[8px] rounded-lg text-base bg-emerald-500 text-white"
        >
          Return to generate meal plan
        </Link>

        <Link
          href="/order/placement"
          className="px-[36px] py-[8px] rounded-lg text-base bg-emerald-500 text-white"
        >
          Order now
        </Link>
      </div>
    </>
  );
};
