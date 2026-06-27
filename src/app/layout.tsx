import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Manage your expenses easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Body par p-4 (mobile) se p-6 (desktop) padding di hai */}
      <body className="min-h-full flex flex-col p-4 md:p-2 bg-gray-50">
        
        {/* Navbar aur content ke beech gap ke liye gap-4 ya gap-6 */}
        <div className="flex flex-col gap-4 md:gap-6 max-w-7xl mx-auto w-full">
          <main className="grow">
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}