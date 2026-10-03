import "./globals.css";
import { Cormorant_Garamond, Manrope } from "next/font/google";
const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400","500","600"], style: ["normal","italic"], variable: "--display" });
const body = Manrope({ subsets: ["latin"], variable: "--body" });
export const metadata = {
  title: "RVS Design Studio | Interior Design",
  description: "Thoughtful residential and commercial interiors by RVS Design Studio. View our work and visit the studio.",
};
export default function RootLayout({ children }) {
  return (<html lang="en"><body className={`${display.variable} ${body.variable}`}>{children}</body></html>);
}
