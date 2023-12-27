import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/context/themeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "Almavine",
  description:
    "Almavine: Elevate your college experience with a single platform. Seamlessly blend academia, productivity, social connections, and travel. Your daily feed meets powerful tools, fostering a vibrant campus life. Join the journey at Almavine, where every moment becomes a memorable milestone. Unleash the potential of your college years with Almavine's all-in-one hub",
  icons: {
    icon: "assets/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
