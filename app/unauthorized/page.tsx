import Link from "next/link";

export default function Unauthorized() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">403 - Ooops!</h1>
      <p className="mt-4 text-lg">
        You are not authorized to access this page.
      </p>
      <Link
        href="/sign-in"
        className="mt-6 text-blue-500 hover:underline text-2xl"
      >
        Go back to Sign-In
      </Link>
    </main>
  );
}
