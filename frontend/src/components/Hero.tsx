"use client";

import Image from "next/image";
import Link from "next/link";
import FoodImage from "public/food.jpg";
import { useIsLoggedIn } from "src/hooks/pages/useIsLoggedIn";

export const Hero = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <section>
      <div className="flex flex-row sm:flex-col gap-[16px] items-center mb-[36px]">
        <div>
          <h1 className="font-semibold text-4xl md:text-5xl lg:text-6xl mb-[16px]">
            Personalized Diet Plans for a
            <span className="text-emerald-500"> Healthier You.</span>
          </h1>

          <p className="text-base lg:w-[540px]">
            Take control of your nutrition with smart meal planning tailored to
            your goals, preferences, and lifestyle. Discover balanced recipes
            and build sustainable eating habits — all in one place.
          </p>
        </div>

        <Image
          alt="Food illustration"
          src={FoodImage.src}
          width={280}
          height={280}
        />
      </div>

      <h2 className="font-medium text-2xl md:text-3xl mb-[24px] text-center sm:text-left">
        Create your diet plan right now.
      </h2>

      {isLoggedIn ? (
        <div className="flex justify-center">
          <Link
            href="/generate-meal-plan"
            className="px-[36px] py-[8px] rounded-lg bg-emerald-500 text-white"
          >
            Generate a Diet plan
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Link
            href="/signup"
            className="px-[36px] py-[8px] rounded-lg bg-emerald-500 text-white"
          >
            Signup
          </Link>
          <Link href="sign-in" className="text-base text-emerald-500">
            Already a member? Sign In
          </Link>
        </div>
      )}
    </section>
  );
};
