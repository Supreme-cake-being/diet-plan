import Link from "next/link";

interface IIngredientById {
  ingredient: Record<string, any>;
}

export const IngredientById = ({ ingredient }: IIngredientById) => {
  const { name, description, category, calories, protein, carbs, fat } =
    ingredient;

  return (
    <div className="mx-auto w-[720px] sm:w-full">
      <h1 className="mb-[16px] text-5xl font-bold sm:text-4xl">{name}</h1>
      <p className="mb-[16px] text-base">{category}</p>
      <p className="mb-[16px] text-base">{description}</p>

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
  );
};
