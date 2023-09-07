import { Lobster, Poppins } from "next/font/google";

export const lobster = Lobster({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-lobster",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "700", "900"],
  display: "swap",
  variable: "--font-poppins",
});
