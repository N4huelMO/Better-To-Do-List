import { Lobster, Poppins } from "next/font/google";

export const lobster = Lobster({
  subsets: ["latin"],
  weight: ["400"],
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});
