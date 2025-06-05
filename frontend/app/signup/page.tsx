import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignupForm } from "src/components/forms/SignupForm";

export default async function SignupPage() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("token");

  if (userToken) {
    redirect("/");
  }

  return <SignupForm />;
}
