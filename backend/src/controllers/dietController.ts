import { ctrlWrapper } from 'decorators';
import { Request, Response } from 'express';
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

const calculateMacros = async (req: Request, res: Response) => {
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

const generateMealPlan = async (req: Request, res: Response) => {
  res.json();
};

export default {
  calculateMacros: ctrlWrapper(calculateMacros),
  generateMealPlan: ctrlWrapper(generateMealPlan),
};
