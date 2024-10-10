"use client";
import { SubmitButton } from "@/components/SubmitButton";
import { signInAction } from "@/lib/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function SignInPage() {
  const handleFormSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const res = await signInAction({ email, password });
    if (res.error) {
      alert(res.error);
      return;
    }
    redirect("/");
  };

  return (
    <main className="flex flex-col items-center mt-[10vh]">
      <form
        className="flex flex-col items-center bg-gray-900 p-8 w-full max-w-[500px] rounded-sm shadow-lg border-t-[10px] border-gray-400"
        action={handleFormSubmit}
      >
        <h1 className="flex gap-2 items-center p-2 font-bold text-center text-white">
          Sign In
        </h1>
        <input
          className="p-4 rounded-sm outline-none shadow-sm bg-gray-800 text-white mt-2 w-[300px]"
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          className="p-4 rounded-sm outline-none shadow-sm bg-gray-800 text-white mt-2 w-[300px]"
          name="password"
          type="password"
          placeholder="Password"
        />
        <SubmitButton pendingText="Logging in...">Login</SubmitButton>
        <Link className="text-gray-400 hover:underline mt-4" href="/sign-up">
          Don't have an account? Sign Up
        </Link>
      </form>
    </main>
  );
}
