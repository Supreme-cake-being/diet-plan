import axios from "axios";
import { IngredientsList } from "src/components/IngredientsList";

export default async function IngredientsPage() {
  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_API + "/food/ingredients"
  );

  return <IngredientsList ingredients={data} />;
}
