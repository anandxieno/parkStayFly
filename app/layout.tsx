import type { Metadata } from "next";
import { Red_Hat_Text, Red_Hat_Display, Montserrat } from "next/font/google";
import "./globals.css";

const redHatText = Red_Hat_Text({
  variable: "--font-red-hat-text",
  subsets: ["latin"],
  display: "swap",
});

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Park Stay Fly",
  description: "Park Stay Fly",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${redHatText.variable} ${redHatDisplay.variable} ${montserrat.variable} antialiased`}
      >
          {children}
        
      </body>
    </html>
  );
}
