import type { Metadata } from "next";
import { Geist_Mono, Merriweather } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {
	defaultSocialImage,
	defaultSocialImageAlt,
} from "@/lib/site-metadata";

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
  metadataBase: new URL("https://www.redtailtelematics.com"),
  applicationName: "Redtail Telematics",
  title: "Redtail Telematics",
  description:
    "Connected vehicle intelligence for fleets, insurers, and OEM programs.",
  category: "Telematics",
  creator: "Redtail Telematics",
  publisher: "Redtail Telematics",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Redtail Telematics",
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    site: "@RedtailTele",
    images: [
      {
        url: defaultSocialImage.url,
        alt: defaultSocialImageAlt,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
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
