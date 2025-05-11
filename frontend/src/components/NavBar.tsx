"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const pathname = usePathname();

  const paths = {
    home: "/",
    generateMealPlan: "/generate-meal-plan",
    meals: "/meals",
    ingredients: "/ingredients",
    signup: "/signup",
    signIn: "/sign-in",
  };

  return (
    <nav className="py-[16px] flex justify-between items-center">
      <Link href="/">
        <p className="font-semibold text-base md:text-lg">
          <span className="text-emerald-500">diet</span>plan.
        </p>
      </Link>

      <div className="h-full flex items-center justify-center gap-[16px]">
        <Link
          href="/"
          className={`text-sm ${
            pathname === paths.home ? "text-emerald-500" : "text-black"
          }`}
        >
          Home
        </Link>
        <Link
          href="/generate-meal-plan"
          className={`text-sm ${
            pathname === paths.generateMealPlan
              ? "text-emerald-500"
              : "text-black"
          }`}
        >
          Generate meal plan
        </Link>
        <Link
          href="/meals"
          className={`text-sm ${
            pathname === paths.meals ? "text-emerald-500" : "text-black"
          }`}
        >
          Meals
        </Link>
        <Link
          href="/ingredients"
          className={`text-sm ${
            pathname === paths.ingredients ? "text-emerald-500" : "text-black"
          }`}
        >
          Ingredients
        </Link>
      </div>

      <div className="flex gap-2">
        <Link href={paths.signIn} className="text-base">
          Sign In
        </Link>
        <Link href={paths.signup} className="text-base">
          Signup
        </Link>
      </div>
    </nav>
  );
};
