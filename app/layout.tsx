import type { Metadata } from "next";
import { Geist_Mono, Merriweather } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Redtail",
  description: "Connected vehicle intelligence for fleets, insurers, and OEM programs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", merriweather.variable, geistMono.variable, "font-sans")}
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
