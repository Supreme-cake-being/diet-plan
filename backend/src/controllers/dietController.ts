import { ctrlWrapper } from 'decorators';
import { db } from 'drizzle';
import { eq, inArray, notInArray, sql } from 'drizzle-orm';
import { ingredients, meals, mealsIngredients } from 'drizzle/schema';
import { RequestHandler } from 'express';
import { HttpError } from 'helpers';

const activityLevels: Record<string, number> = {
  sedentary: 1.2,
  lightlyActive: 1.375,
  moderatelyActive: 1.55,
  veryActive: 1.725,
  extremelyActive: 1.9,
};

const goals: Record<string, number> = {
  lose: 0.75,
  maintain: 1,
  gain: 1.1,
};

const calculateMacros: RequestHandler = async (req, res) => {
  const user = req.user;
  const { dailyActivityLevel, goal, preferredDiet } = req.body;

  if (!user?.weight || !user?.height || !user?.age || !user?.gender) {
    throw HttpError(
      400,
      'User does not have weight, height, age or gender property'
    );
  }

  const formula = 10 * user?.weight + 6.25 * user?.height - 5 * user?.age;
  const BMR = user?.gender === 'male' ? formula + 5 : formula - 161; // Basal Metabolic Rate
  const TDEE = BMR * activityLevels[dailyActivityLevel]; // Total Daily Energy Expenditure

  // Adjust Calories Based on Goal
  const adjustedCalories = TDEE * goals[goal];

  // Macronutrient Ratios Based on Diet Preference
  let macros = { protein: 0, carbs: 0, fats: 0 };
  if (preferredDiet === 'balanced') {
    macros = {
      protein: (adjustedCalories * 0.3) / 4, // 30% protein
      carbs: (adjustedCalories * 0.4) / 4, // 40% carbs
      fats: (adjustedCalories * 0.3) / 9, // 30% fats
    };
  } else if (preferredDiet === 'lowCarb') {
    macros = {
      protein: (adjustedCalories * 0.4) / 4, // 40% protein
      carbs: (adjustedCalories * 0.2) / 4, // 20% carbs
      fats: (adjustedCalories * 0.4) / 9, // 40% fats
    };
  } else if (preferredDiet === 'highProtein') {
    macros = {
      protein: (adjustedCalories * 0.5) / 4, // 50% protein
      carbs: (adjustedCalories * 0.25) / 4, // 25% carbs
      fats: (adjustedCalories * 0.25) / 9, // 25% fats
    };
  } else {
    throw HttpError(400, 'Invalid diet preference');
  }

  res.json({
    calories: adjustedCalories,
    macros,
  });
};

function getMacroDiffScore(
  total: { calories: number; protein: number; carbs: number; fat: number },
  target: { calories: number; protein: number; carbs: number; fat: number }
) {
  return (
    Math.abs(total.calories - target.calories) +
    Math.abs(total.protein - target.protein) * 2 +
    Math.abs(total.carbs - target.carbs) +
    Math.abs(total.fat - target.fat)
  );
}

const generateMealPlan: RequestHandler = async (req, res) => {
  const {
    calories,
    protein,
    carbs,
    fat,
    excludedIngredientCategories = [],
  } = req.body;

  // Step 1: Find meals that DO contain excluded ingredient categories
  const excludedMealIdsResult = await db
    .selectDistinct({ mealId: mealsIngredients.mealId })
    .from(mealsIngredients)
    .innerJoin(ingredients, eq(mealsIngredients.ingredientId, ingredients.id))
    .where(inArray(ingredients.category, excludedIngredientCategories));

  const excludedMealIds = excludedMealIdsResult.map(r => r.mealId);

  // Step 2: Select meals that are NOT in that list
  const safeMeals = await db
    .select()
    .from(meals)
    .where(
      excludedMealIds.length > 0
        ? notInArray(meals.id, excludedMealIds)
        : undefined // no exclusion necessary if nothing is excluded
    );

  if (safeMeals.length === 0) {
    throw HttpError(404, 'No meals match the given restrictions');
  }

  // Step 3: Greedy combination logic
  let selectedMeals: typeof safeMeals = [];
  let currentTotals = { calories: 0, protein: 0, carbs: 0, fat: 0 };

  while (selectedMeals.length < 5) {
    let bestMeal: (typeof safeMeals)[0] | null = null;
    let bestScore = Infinity;

    for (const meal of safeMeals) {
      if (selectedMeals.some(m => m.id === meal.id)) continue;

      const tempTotal = {
        calories: currentTotals.calories + Number(meal.calories),
        protein: currentTotals.protein + Number(meal.protein),
        carbs: currentTotals.carbs + Number(meal.carbs),
        fat: currentTotals.fat + Number(meal.fat),
      };

      const score = getMacroDiffScore(tempTotal, {
        calories,
        protein,
        carbs,
        fat,
      });

      if (score < bestScore) {
        bestScore = score;
        bestMeal = meal;
      }
    }

    if (!bestMeal) break;

    selectedMeals.push(bestMeal);
    currentTotals = {
      calories: currentTotals.calories + Number(bestMeal.calories),
      protein: currentTotals.protein + Number(bestMeal.protein),
      carbs: currentTotals.carbs + Number(bestMeal.carbs),
      fat: currentTotals.fat + Number(bestMeal.fat),
    };

    // Early exit if close enough
    if (
      getMacroDiffScore(currentTotals, { calories, protein, carbs, fat }) < 100
    )
      break;
  }

  res.json({ meals: selectedMeals, total: currentTotals });
};

export default {
  calculateMacros: ctrlWrapper(calculateMacros),
  generateMealPlan: ctrlWrapper(generateMealPlan),
};
