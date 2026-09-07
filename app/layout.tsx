import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3C NextGen Learning Experience",
  description: "Interactive concept prototype for a personalized coding learning experience."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
