import axios from "axios";
import { MealById } from "src/components/MealById";

interface IProps {
  params: Promise<{ mealId: string }>; // NEW: treat params as a Promise
}

export default async function MealByIdPage({ params }: IProps) {
  const resolvedParams = await params;
  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_API + `/food/meals/${resolvedParams.mealId}`
  );

  console.log(data);

  return <MealById meal={data} />;
}
