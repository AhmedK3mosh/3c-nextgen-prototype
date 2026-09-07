import "./globals.css";
import "./hero-exact.css";
import "./polish.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3C NextGen Learning Experience",
  description: "Interactive bilingual concept for a personalized coding and AI learning journey for children."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
