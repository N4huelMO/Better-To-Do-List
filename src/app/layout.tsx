import "./globals.css";
import { Metadata } from "next";

import ThemeWrapper from "./ThemeWrapper";
import { lobster, poppins } from "./fonts";
import { AppProvider } from "@/context/AppProvider";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Container } from "@/styles/sharedStyles";

export const metadata: Metadata = {
  title: "Better To-Do List",
  description:
    "A powerful task management app for enhanced productivity and organization.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${lobster.variable}`}>
      <body>
        <AppProvider>
          <ThemeWrapper>
            <Container>
              <Sidebar />
              {children}
            </Container>
          </ThemeWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
