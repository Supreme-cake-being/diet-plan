"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "src/components/common/Input";
import { useResendEmail } from "src/hooks/pages/auth/useResendEmail";
import { useSignup } from "src/hooks/pages/auth/useSignup";

export const SignupForm = () => {
  const router = useRouter();

  const [passwordFieldType, setPasswordFieldType] = useState<
    "password" | "text"
  >("password");

  const [reenteredPasswordFieldType, setReenteredPasswordFieldType] = useState<
    "password" | "text"
  >("password");

  const onSuccess = () => router.push("/sign-in");

  const { control, isValid, handleSubmit } = useSignup(onSuccess);
  const { handleResendEmail } = useResendEmail();

  return (
    <section className="py-[32px] mx-auto w-[480px] sm:w-full">
      <h1 className="mb-[16px] font-medium text-2xl">Signup</h1>

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
          name="name"
          label="Enter your name"
          control={control}
          rules={{ required: true }}
          type="name"
          placeholder="Name"
        />

        <Input
          name="password"
          label="Enter your password"
          control={control}
          rules={{ required: true }}
          type={passwordFieldType}
          placeholder="Password"
        />

        <Input
          name="reenteredPassword"
          label="Re-enter your password"
          control={control}
          rules={{ required: true }}
          type={reenteredPasswordFieldType}
          placeholder="Re-enter password"
        />

        <button
          type="submit"
          disabled={!isValid}
          className="px-[30px] py-[8px] rounded-lg text-base md:text-lg bg-emerald-500 text-white"
        >
          Signup
        </button>
      </form>

      <div className="flex flex-col gap-[6px]">
        <Link
          href="/sign-in"
          className="font-normal text-base text-emerald-500"
        >
          Sign In
        </Link>

        <button
          onClick={handleResendEmail}
          className="font-normal text-base text-emerald-500 text-left"
        >
          Resend confirmation email
        </button>
      </div>
    </section>
  );
};
