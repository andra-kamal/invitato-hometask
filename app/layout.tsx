import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Josefin_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

const josefin = Josefin_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-josefin",
});

export const metadata: Metadata = {
  title: "Ricky & Fellycia - Wedding Invitation",
  description: "The Wedding of Ricky & Fellycia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/1.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preload" href="/10.webp" as="image" type="image/webp" fetchPriority="high" />
      </head>
      <body
        className={`${cormorant.variable} ${greatVibes.variable} ${josefin.variable} bg-brand-bg text-brand-primary min-h-screen flex flex-col font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
