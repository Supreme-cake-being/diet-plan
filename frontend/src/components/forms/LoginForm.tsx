"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "src/components/common/Input";
import { useLogin } from "src/hooks/pages/auth/useLogin";

export const LoginForm = () => {
  const [passwordFieldType, setPasswordFieldType] = useState<
    "password" | "text"
  >("password");

  const router = useRouter();

  const onSuccess = () => {
    router.push("/");
    router.refresh();
  };

  const { control, isValid, handleSubmit } = useLogin(onSuccess);

  return (
    <section className="py-[32px] mx-auto w-[480px] sm:w-full">
      <h1 className="mb-[16px] font-medium text-2xl">Sign In</h1>

      <form
        className="mb-[16px] flex flex-col gap-[16px]"
        onSubmit={handleSubmit}
      >
        <Input
          name="email"
          label="Enter your email"
          control={control}
          rules={{ required: true }}
          type="email"
          placeholder="Email"
        />

        <Input
          name="password"
          label="Enter your password"
          control={control}
          rules={{ required: true }}
          type={passwordFieldType}
          placeholder="Password"
        />

        <button
          type="submit"
          disabled={!isValid}
          className="px-[30px] py-[8px] rounded-lg text-base md:text-lg bg-emerald-500 text-white"
        >
          Sign In
        </button>
      </form>

      <div className="flex flex-col gap-[6px]">
        <Link
          href="/forgot-password"
          className="font-normal text-base text-emerald-500"
        >
          Forgot password?
        </Link>

        <Link href="/signup" className="font-normal text-base text-emerald-500">
          Signup
        </Link>
      </div>
    </section>
  );
};
