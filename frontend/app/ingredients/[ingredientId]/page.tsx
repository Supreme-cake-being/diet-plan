import axios from "axios";
import { IngredientById } from "src/components/IngredientById";

interface IProps {
  params: Promise<{ ingredientId: string }>; // NEW: treat params as a Promise
}

export default async function IngredientByIdPage({ params }: IProps) {
  const resolvedParams = await params;
  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_API +
      `/food/ingredients/${resolvedParams.ingredientId}`
  );

  console.log(data);

  return <IngredientById ingredient={data} />;
}
