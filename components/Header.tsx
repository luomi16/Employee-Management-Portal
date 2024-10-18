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
      <nav className="flex items-center justify-between w-full">
        {" "}
        {/* Use justify-between for alignment */}
        <div className="flex items-center space-x-6">
          {" "}

        </div>
        <div className="flex items-center space-x-6">
          {" "}
          {/* Align sign in/out section */}
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
