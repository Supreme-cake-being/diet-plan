import Link from "next/link";

interface IMealItem {
  meal: Record<string, string | number>;
  mealType?: string;
}

export const MealItem = ({ meal, mealType }: IMealItem) => {
  const { id, name, calories, protein, carbs, fat, countryOrigin } = meal;

  return (
    <li className="pt-[16px]">
      {mealType && <p className="text-xl">{mealType}</p>}

      <div className="flex sm:flex-col sm:items-start sm:gap-[16px] items-center justify-between">
        <div>
          <Link href={`/meals/${id}`} className="text-base text-emerald-500">
            {name}
          </Link>
          <p>{countryOrigin}</p>
        </div>

        <div className="block sm:flex ">
          <p className="text-xs">Calories: {calories}</p>
          <p className="text-xs">Protein: {protein}</p>
          <p className="text-xs">Carbs: {carbs}</p>
          <p className="text-xs">Fat: {fat}</p>
        </div>
      </div>
    </li>
  );
};
