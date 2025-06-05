import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "src/components/forms/LoginForm";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("token");

  if (userToken) {
    redirect("/");
  }

  return <LoginForm />;
}
