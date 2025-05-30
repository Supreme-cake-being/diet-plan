import Image from "next/image";
import Link from "next/link";
import GenerateImage from "public/generate.jpg";
import { GenerateMealPlanForm } from "src/components/forms/GenerateMealPlanForm";

export const GenerateMealPlan = () => {
  return (
    <section className="pt-[36px]">
      <div className="mb-[36px] flex sm:flex-col items-center gap-[16px]">
        <div>
          <h1 className="font-semibold text-3xl md:text-4xl lg:text-6xl mb-[16px]">
            Generate Meal Plan
          </h1>

          <p className="text-base">
            Effortlessly create personalized meal plans tailored to your calorie
            and macronutrient needs. Whether you're aiming to lose weight, gain
            muscle, or simply eat healthier, our generator helps you stay on
            track with balanced, goal-focused meals — no guesswork required.
          </p>
        </div>

        <Image
          alt="Food illustration"
          src={GenerateImage.src}
          width={280}
          height={280}
        />
      </div>

      <p className="text-center mb-[16px]">
        Not sure? Try our{" "}
        <Link href="/user" className="text-base text-emerald-500">
          Calorie Calculator
        </Link>
      </p>

      <GenerateMealPlanForm />

      <div className="mt-[16px] flex justify-center">
        <Link
          href="/order"
          className="px-[36px] py-[8px] rounded-lg text-base bg-emerald-500 text-white"
        >
          Order
        </Link>
      </div>
    </section>
  );
};
