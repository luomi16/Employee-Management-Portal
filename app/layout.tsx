import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Container } from "react-bootstrap";
import { ApolloProvider } from "@apollo/client";
import client from "./lib/apolloClient";

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
    // <ApolloProvider client={client}>
    <html lang="en">
      <body className="bg-gray-900 text-white flex flex-col min-h-screen">
        <Header />
        <main className={`${inter.className} flex-grow p-8`}>{children}</main>
        <Footer />
      </body>
    </html>
    // </ApolloProvider>
  );
}
