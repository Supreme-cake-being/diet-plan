"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "src/components/common/Input";
import { useRestorePassword } from "src/hooks/pages/auth/useRestorePassword";

interface IRestorePasswordForm {
  restorationToken: string;
}

export const RestorePasswordForm = ({
  restorationToken,
}: IRestorePasswordForm) => {
  const router = useRouter();

  const [passwordFieldType, setPasswordFieldType] = useState<
    "password" | "text"
  >("password");

  const [reenteredPasswordFieldType, setReenteredPasswordFieldType] = useState<
    "password" | "text"
  >("password");

  const onSuccess = () => router.push("/sign-in");

  const { control, isValid, handleSubmit } = useRestorePassword(
    restorationToken,
    onSuccess
  );

  return (
    <section className="py-[32px] mx-auto w-[480px] sm:w-full">
      <h1 className="mb-[16px] font-medium text-2xl">Change password</h1>

      <form
        className="mb-[16px] flex flex-col gap-[16px]"
        onSubmit={handleSubmit}
      >
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
          Change password
        </button>
      </form>

      <div className="flex flex-col gap-[6px]">
        <Link
          href="/sign-in"
          className="font-normal text-base text-emerald-500"
        >
          Sign In
        </Link>
      </div>
    </section>
  );
};
