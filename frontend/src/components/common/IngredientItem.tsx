import Link from "next/link";

interface IIngredientItem {
  ingredient: Record<string, string | number>;
}

export const IngredientItem = ({ ingredient }: IIngredientItem) => {
  const { id, name, calories, protein, carbs, fat, category } = ingredient;

  return (
    <li className="pt-[16px]">
      <div className="flex sm:flex-col sm:items-start sm:gap-[16px] items-center justify-between">
        <div>
          <Link
            href={`/ingredients/${id}`}
            className="text-base text-emerald-500"
          >
            {name}
          </Link>
          <p>{category}</p>
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
