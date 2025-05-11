import type { Metadata } from "next";
import "@/app/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SharedLayout } from "@/src/components/SharedLayout/SharedLayout";
import { ThemeProvider } from "styled-components";
import { theme } from "@/src/constants/theme";

const queryClient = new QueryClient();

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
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <SharedLayout>{children}</SharedLayout>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
