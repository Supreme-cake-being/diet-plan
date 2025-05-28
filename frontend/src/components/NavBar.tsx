"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "src/components/common/MobileMenu";
import { Logout } from "src/components/Logout";

interface INavBar {
  isLoggedIn: boolean;
}

export const NavBar = ({ isLoggedIn }: INavBar) => {
  const pathname = usePathname();

  const paths = {
    home: "/",
    generateMealPlan: "/generate-meal-plan",
    meals: "/meals",
    ingredients: "/ingredients",
    signup: "/signup",
    signIn: "/sign-in",
  };

  console.log(isLoggedIn);

  return (
    <header className="py-[16px]">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <p className="font-semibold sm:text-base text-lg ">
            <span className="text-emerald-500">diet</span>plan.
          </p>
        </Link>

        <ul className="sm:hidden h-full flex items-center justify-center gap-[16px]">
          <li>
            <Link
              href="/"
              className={`text-sm ${
                pathname === paths.home ? "text-emerald-500" : "text-black"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
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
          </li>
          <li>
            <Link
              href="/meals"
              className={`text-sm ${
                pathname === paths.meals ? "text-emerald-500" : "text-black"
              }`}
            >
              Meals
            </Link>
          </li>
          <li>
            <Link
              href="/ingredients"
              className={`text-sm ${
                pathname === paths.ingredients
                  ? "text-emerald-500"
                  : "text-black"
              }`}
            >
              Ingredients
            </Link>
          </li>
        </ul>

        <MobileMenu isLoggedIn={isLoggedIn} />

        {isLoggedIn ? (
          <div className="sm:hidden md:block flex gap-2">
            <Logout />
          </div>
        ) : (
          <div className="sm:hidden md:block flex gap-2">
            <Link
              href={paths.signIn}
              className="px-[36px] py-[8px] rounded-lg text-base bg-emerald-500 text-white"
            >
              Sign In
            </Link>
            <Link href={paths.signup} className="text-base">
              Signup
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};
