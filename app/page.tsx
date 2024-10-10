import { auth, signOut } from "@/auth";
import Link from "next/link";
import {
  isRedirectError,
  redirect,
} from "next/dist/client/components/redirect";
import { Container } from "react-bootstrap";

export default async function Home() {
  const session = await auth();

  return (
    <main className="main-container flex flex-col justify-center items-center min-h-screen">
      <h1 className="header-text text-3xl font-bold mt-4 text-center">
        Welcome to Employee Management System
      </h1>

      {session?.user ? (
        <p className="mt-4 text-lg">Current User: {session?.user?.email}</p>
      ) : (
        <Container>
          <p className="mt-4 text-lg">
            If you don't have an account, please{" "}
            <Link
              href="/sign-up"
              className="text-white underline hover:text-blue-400"
            >
              sign up
            </Link>
            .
          </p>
          <p className="mt-4 text-lg">
            If you have an account, please{" "}
            <Link
              href="/sign-in"
              className="text-white underline hover:text-blue-400"
            >
              sign in
            </Link>
            .
          </p>
        </Container>
      )}
    </main>
  );
}
