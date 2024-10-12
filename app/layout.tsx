import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReduxProvider from "./lib/redux/reduxProvider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS MongoDB Prisma Starter",
  description: "NextJS MongoDB Prisma Starter with TypeScript and TailwindCSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white flex flex-col min-h-screen">
          <ReduxProvider>
            <Header />
            <main className={`${inter.className} flex-grow p-8`}>{children}</main>
            <Footer />
          </ReduxProvider>
      </body>
    </html>
  );
}
