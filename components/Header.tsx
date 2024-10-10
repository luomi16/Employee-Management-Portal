import Link from "next/link";
import { useState, useEffect } from "react";
import { auth, signOut } from "@/auth";
import { SubmitButton } from "@/components/SubmitButton";
import {
  isRedirectError,
  redirect,
} from "next/dist/client/components/redirect";

export default async function Header() {
  const session = await auth();

  return (
    <header className="p-6 bg-gray-800 shadow-md">
      <nav className="flex items-center space-x-6 w-full">
        <Link href="/" className="text-white hover:underline">
          Home
        </Link>
        <Link href="/dashboard" className="text-white hover:underline">
          Dashboard
        </Link>
        <Link href="/personal-info" className="text-white hover:underline">
          Personal Info
        </Link>
        <Link href="/visa-management" className="text-white hover:underline">
          Visa
        </Link>
        <Link
          href="/hr/hiring-management"
          className="text-white hover:underline"
        >
          Hire
        </Link>
        <Link
          href="/onboarding-application"
          className="text-white hover:underline"
        >
          Onboarding
        </Link>

        <div className="ml-auto flex items-center space-x-6">
          {session?.user ? (
            <form
              action={async () => {
                "use server";
                try {
                  await signOut({ redirect: false });
                } catch (err) {
                  if (isRedirectError(err)) {
                    console.error(err);
                    throw err;
                  }
                } finally {
                  redirect("/");
                }
              }}
            >
              <SubmitButton
                pendingText="Signing out..."
                className="bg-[hsl(191,52%,30%)] hover:bg-[hsl(191,52%,35%)] rounded-sm"
              >
                Sign Out
              </SubmitButton>
            </form>
          ) : (
            <Link
              href="/auth/sign-in"
              className="text-white underline hover:text-blue-400 block"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
