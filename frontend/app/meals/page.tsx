import axios from "axios";
import { MealsList } from "src/components/MealsList";

export default async function GenerateMealPlanPage() {
  const { data } = await axios.get(process.env.NEXT_PUBLIC_API + "/food/meals");

  return <MealsList meals={data} />;
}
