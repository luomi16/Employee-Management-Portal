"use client";
import { signInSchema } from "@/lib/form-schemas";
import { SubmitButton } from "@/components/SubmitButton";
import { signInAction } from "@/lib/actions";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "./../lib/redux/store";
import { setUser } from "./../lib/redux/slices/userSlice";

// Define the form values type
interface FormValues {
  email: string;
  password: string;
}

export default function SignInPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleFormSubmit = async (formValues: FormValues) => {
    try {
      // Validate form values with schema
      const validationResult = signInSchema.safeParse(formValues);

      if (!validationResult.success) {
        alert(validationResult.error.errors[0].message);
        return; // Stop execution if validation fails
      }

      // If validation passes, proceed with sign-in action
      const res = await signInAction(formValues);
      if (res.error) {
        alert(res.error);
        return; // Stop execution if sign-in fails
      }

      // const userInfo = res.data
      // dispatch(setUser(userInfo))
      // // Navigate to the home page after successful sign-in
      // router.push("/");

      // Dispatch to Redux store to store user details
      if (res.data) {
        // console.log(res.data);
        dispatch(setUser(res.data));
        router.push("/dashboard");
      }
    } catch (err) {
      console.log(typeof err);
      console.error("Sign-in error:", typeof err, err);
      alert("An error occurred during sign-in.");
    }
  };

  return (
    <main className="flex flex-col items-center mt-[10vh]">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange }) => (
          <Form className="flex flex-col items-center bg-gray-900 p-8 w-full max-w-[500px] rounded-sm shadow-lg border-t-[10px] border-gray-400">
            <h1 className="flex gap-2 items-center p-2 font-bold text-center text-white">
              Sign In
            </h1>
            <Field
              className="p-4 rounded-sm outline-none shadow-sm bg-gray-800 text-white mt-2 w-[300px]"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
            <Field
              className="p-4 rounded-sm outline-none shadow-sm bg-gray-800 text-white mt-2 w-[300px]"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
            <SubmitButton pendingText="Logging in...">Login</SubmitButton>
            <Link
              className="text-gray-400 hover:underline mt-4"
              href="/sign-up"
            >
              Don't have an account? Sign Up
            </Link>
          </Form>
        )}
      </Formik>
    </main>
  );
}
