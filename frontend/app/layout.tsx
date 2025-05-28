import type { Metadata } from "next";
import { NavBar } from "src/components/NavBar";
import "app/globals.css";
import { cookies } from "next/headers";
import { useRefresh } from "src/hooks/pages/auth/useRefresh";

export const metadata: Metadata = {
  title: "Diet Plan",
  description: "An app designed to help with diet planning.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("token");

  const currentUser = await useRefresh(userToken);

  console.log();

  return (
    <html lang="en">
      <body>
        <div className="container pb-[16px]">
          <NavBar isLoggedIn={!!userToken} />
          {children}
        </div>
      </body>
    </html>
  );
}
