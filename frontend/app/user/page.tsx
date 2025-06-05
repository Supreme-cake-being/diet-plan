import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserForm } from "src/components/forms/UserForm";
import { useRefresh } from "src/hooks/pages/auth/useRefresh";

export default async function UserPage() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("token");

  const currentUser = await useRefresh(userToken);

  if (!userToken) {
    redirect("/sign-in");
  }

  return <UserForm user={currentUser} />;
}
