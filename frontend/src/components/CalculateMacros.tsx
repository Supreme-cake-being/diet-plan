import Image from "next/image";
import CalculateImage from "public/calculate.jpg";
import { CalculateMacrosForm } from "src/components/forms/CalorieCalculatorForm";

export const CalculateMacros = () => {
  return (
    <section className="pt-[36px]">
      <div className="mb-[36px] flex sm:flex-col items-center gap-[16px]">
        <Image
          alt="Food illustration"
          src={CalculateImage.src}
          width={280}
          height={280}
        />

        <div>
          <h1 className="font-semibold text-4xl md:text-5xl lg:text-6xl mb-[16px]">
            Calculate macros
          </h1>
          <p className="text-base mb-[16px]">
            Discover your ideal calorie and macronutrient targets with our
            intuitive calculator.
          </p>
          <p className="text-base">
            Whether you're aiming to lose weight, build muscle, or simply eat
            healthier, our tool takes the guesswork out of planning. Get
            personalized nutrition goals in seconds, then pair them with our
            Automatic Meal Planner to enjoy balanced, goal-focused meals without
            the hassle.
          </p>
        </div>
      </div>

      <CalculateMacrosForm />
    </section>
  );
};
