"use client";

import Link from "next/link";

export const LoginForm = () => {
  const handleSignup = () => {
    console.log;
  };

  const handleResendEmail = () => {
    console.log("email resended");
  };

  return (
    <section className="py-[16px]">
      <h1 className="mb-[16px] font-medium text-2xl">Sign in</h1>

      <form className="mb-[16px] flex flex-col gap-[16px]">
        <button type="submit" onClick={handleSignup}>
          Sign In
        </button>
      </form>

      <div className="flex -flex-col gap-[6px]">
        <Link href="sign-in">Sign In</Link>
        <button onClick={handleResendEmail}>Resend Confirmation Email</button>
      </div>
    </section>
  );
};
