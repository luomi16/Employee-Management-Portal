"use client";
import { signUpSchema } from "@/lib/form-schemas";
import { SubmitButton } from "@/components/SubmitButton";
import { signUpAction } from "@/lib/actions";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function SignUpPage() {
  const handleFormSubmit = async (formData: FormData) => {
    const formValues = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { error } = await signUpSchema.safeParseAsync(formValues);
    if (error) {
      alert(error.issues[0].message);
    }

    const res = await signUpAction(formValues);
    if (res?.error) {
      alert(res.error);
    }
  };

  return (
    <main className="flex flex-col items-center mt-[10vh]">
      <form
        className="flex flex-col items-center bg-gray-900 p-8 w-full max-w-[500px] rounded-sm shadow-lg border-t-[10px] border-gray-400"
        action={handleFormSubmit}
      >
        <h1 className="flex gap-2 items-center p-2 font-bold text-center">
          Sign Up
        </h1>
        <p className="text-center text-sm text-gray-500">
          Demo app, please don't use your real email or password
        </p>
        <input
          className="p-4 rounded-sm outline-none shadow-sm bg-gray-800 text-white mt-2 w-[300px]"
          name="username"
          type="text"
          placeholder="Username"
        />
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
        <SubmitButton pendingText="Creating account...">
          Create Account
        </SubmitButton>
        <Link className="text-gray-400 hover:underline mt-4" href="/sign-in">
          Already have an account? Sign In
        </Link>
      </form>
      <div
        className="w-[70%] h-[2px] bg-gray-400 mt-4 rounded-full"
        id="divider"
      />
    </main>
  );
}
