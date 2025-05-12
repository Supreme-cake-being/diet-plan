import type { Metadata } from "next";
import "@/app/globals.css";
import { NavBar } from "@/components/NavBar";

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
        <div className="container">
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}
