"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "src/components/common/Input";
import { useForgotPassword } from "src/hooks/pages/auth/useForgotPassword";

export const ForgotPasswordForm = () => {
  const router = useRouter();

  const onSuccess = () => router.push("/sign-in");

  const { control, isValid, handleSubmit } = useForgotPassword(onSuccess);

  return (
    <section className="py-[16px]">
      <h1 className="mb-[16px] font-medium text-2xl">Forgot Password?</h1>

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

        <button
          type="submit"
          disabled={!isValid}
          className="px-[30px] py-[8px] rounded-lg text-base md:text-lg bg-emerald-500 text-white"
        >
          Send
        </button>
      </form>

      <div className="flex flex-col gap-[6px]">
        <Link
          href="/sign-in"
          className="font-normal text-base text-emerald-500"
        >
          Back to Sing In
        </Link>
      </div>
    </section>
  );
};
