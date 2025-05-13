"use client";

import { useRouter } from "next/navigation";
import { useVerify } from "src/hooks/pages/auth/useVerify";

interface IVerification {
  verificationToken: string;
}

export const Verification = ({ verificationToken }: IVerification) => {
  const router = useRouter();

  const onSuccess = () => router.push("/sign-in");

  console.log(verificationToken);

  useVerify(verificationToken, onSuccess);

  return <h1>You will soon be redirected to sing in page</h1>;
};
