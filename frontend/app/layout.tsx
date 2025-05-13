import type { Metadata } from "next";
import { NavBar } from "src/components/NavBar";
import "app/globals.css";

export const metadata: Metadata = {
  title: "Diet Plan",
  description: "An app designed to help with diet planning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container pb-[16px]">
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}
