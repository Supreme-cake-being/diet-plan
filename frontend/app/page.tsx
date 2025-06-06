import { cookies } from "next/headers";
import { Hero } from "src/components/Hero";

export default async function Home() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("token");

  return (
    <>
      <Hero isLoggedIn={!!userToken} />
    </>
  );
}
