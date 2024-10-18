import { auth } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <section className="main-container">
      <h1 className="header-text text-3xl font-bold mt-4 text-center">
        Welcome to Employee Management System
      </h1>

      {session?.user ? (
        <>
          <p className="mt-4 text-lg">Current User: {session?.user?.email}</p>

        </>
      ) : (
        <div>
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
        </div>
      )}
    </section>
  );
}
