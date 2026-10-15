import type { Metadata } from "next";
// @ts-ignore -- Next.js handles CSS imports at build time.
import "./globals.css";
import { Fraunces, Inter, Merriweather, Montserrat } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Merriweather({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "700", "900"],
});

const body = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Karen Community SDA Church",
  description:
    "Karen Community Seventh-day Adventist Church — bulletin, events, ministries, and giving.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-sans text-gray-900`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
