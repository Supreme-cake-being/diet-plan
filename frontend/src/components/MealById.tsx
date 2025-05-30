import Link from "next/link";

interface IMealById {
  meal: Record<string, any>;
}

export const MealById = ({ meal }: IMealById) => {
  const {
    name,
    description,
    type,
    calories,
    protein,
    carbs,
    fat,
    cookingTime,
    countryOrigin,
    cookingDifficulty,
    ingredients,
  } = meal;

  return (
    <div className="mx-auto w-[720px] sm:w-full">
      <h1 className="mb-[16px] text-5xl font-bold sm:text-4xl">{name}</h1>
      <p className="mb-[16px] text-base">{description}</p>

      <div className="grid gap-[16px] grid-cols-[1fr,1fr] sm:block">
        <div className="mb-[16px]">
          <ul className="mb-[16px] flex flex-col gap-[8px] divide-y">
            <li className="pt-[8px]">
              <p className="text-base">Type: {type}</p>
            </li>
            <li className="pt-[8px]">
              <p className="text-base">Coutry Origin: {countryOrigin}</p>
            </li>
            <li className="pt-[8px]">
              <p className="text-base">Cooking Time: {cookingTime}</p>
            </li>
            <li className="pt-[8px]">
              <p className="text-base">
                Cooking Difficulty: {cookingDifficulty}
              </p>
            </li>
          </ul>

          <h2 className="text-4xl font-semibold sm:text-3xl">Ingredients</h2>
          <ul className="flex flex-col gap-[8px] divide-y">
            {ingredients.map(
              ({
                id,
                name: ingredientName,
                category,
              }: Record<string, string>) => (
                <li key={id} className="pt-[8px]">
                  <Link
                    href={`/ingredients/${id}`}
                    className="text-base text-emerald-500"
                  >
                    {ingredientName}
                  </Link>
                  <p className="text-base">{category}</p>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-4xl font-semibold sm:text-3xl">Nutrients</h2>

          <ul className="flex flex-col gap-[8px] divide-y">
            <li className="pt-[8px]">
              <p>Calories {calories}</p>
            </li>
            <li className="pt-[8px]">
              <p>Protein {protein}g</p>
            </li>
            <li className="pt-[8px]">
              <p>Carbohydrates {carbs}g</p>
            </li>
            <li className="pt-[8px]">
              <p>Fat {fat}g</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
