import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider as JotaiProvider } from "jotai";
import { Navbar } from "@components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Rick and Morty",
  description: "Rick and Morty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <JotaiProvider>
          <Navbar />
          {children}
        </JotaiProvider>
      </body>
    </html>
  );
}
