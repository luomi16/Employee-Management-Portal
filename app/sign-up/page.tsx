"use client";
import { signUpSchema } from "@/lib/form-schemas";
import { SubmitButton } from "@/components/SubmitButton";
import { signUpAction } from "@/lib/actions";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

// import { useAppDispatch } from "./../lib/redux/store";
// import { signUpUser } from "./../lib/redux/slices/userSlice";
import { useRouter } from "next/navigation";

// Define the form values type
interface FormValues {
  username: string;
  email: string;
  password: string;
}

const GET_REGISTRATION_TOKENS = gql`
  query Query {
    registrationTokenHistory {
      token
    }
  }
`;

export default function SignUpPage() {
  // const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get("token");
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null); // null indicates still loading

  const { loading, error, data } = useQuery(GET_REGISTRATION_TOKENS);

  // console.log("tokenFromUrl", tokenFromUrl);

  useEffect(() => {
    // console.log("Query loading:", loading);
    // console.log("Query error:", error);
    // console.log("Query data:", data);
    if (loading || error) return;

    if (tokenFromUrl && data) {
      const foundToken = data.registrationTokenHistory.some(
        (tokenData: { token: string }) => tokenData.token === tokenFromUrl
      );

      setIsValidToken(foundToken);
    } else {
      setIsValidToken(false);
    }
  }, [tokenFromUrl, data, loading, error]);

  // Specify the type for formValues
  const handleFormSubmit = async (formValues: FormValues) => {
    try {
      // Validate form values with schema
      const validationResult = await signUpSchema.safeParseAsync(formValues);
      if (!validationResult.success) {
        alert(validationResult.error.issues[0].message);
        return; // Stop execution if validation fails
      }

      // If validation passes, proceed with sign up action
      const res = await signUpAction(formValues);
      if (res?.error) {
        alert(res.error);
        return; // Stop execution if sign-up fails
      }

      router.push("/sign-in");
    } catch (err) {
      console.error("Sign-up error:", err);
      alert("An error occurred during sign-up.");
    }
  };

  return (
    <main className="flex flex-col items-center mt-[10vh]">
      {isValidToken ? (
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={handleFormSubmit}
        >
          {({ handleChange }) => (
            <Form className="flex flex-col items-center bg-gray-900 p-8 w-full max-w-[500px] rounded-sm shadow-lg border-t-[10px] border-gray-400">
              <h1 className="flex gap-2 items-center p-2 font-bold text-center">
                Sign Up
              </h1>
              <p className="text-center text-sm text-gray-500">
                Demo app, please don't use your real email or password
              </p>
              <Field
                className="p-4 rounded-sm outline-none shadow-sm bg-gray-800 text-white mt-2 w-[300px]"
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500"
              />
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
              <SubmitButton pendingText="Creating account...">
                Create Account
              </SubmitButton>
              <Link
                className="text-gray-400 hover:underline mt-4"
                href="/sign-in"
              >
                Already have an account? Sign In
              </Link>
            </Form>
          )}
        </Formik>
      ) : (
        <div>Invalid registration link</div>
      )}
    </main>
  );
}
// "use client";
// import { signUpSchema } from "@/lib/form-schemas";
// import { SubmitButton } from "@/components/SubmitButton";
// import Link from "next/link";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useSelector } from "react-redux";
// import { RootState,useAppDispatch } from "../lib/redux/store";
// import { signUpUser } from "../lib//redux/slices/userSlice";
// import { toFormikValidationSchema } from 'zod-formik-adapter';

// export default function SignUpPage() {
//   const dispatch = useAppDispatch();

//    // Access Redux state
//   const status = useSelector((state: RootState) => state.employee.status);
//   const error = useSelector((state: RootState) => state.employee.error);

// interface FormValues {
//   username: string;
//   email: string;
//   password: string;
// }

//   const handleFormSubmit = async (formValues:FormValues) => {
//     // Dispatch the signUpUser Redux action
//     dispatch(signUpUser(formValues));
//   };

//   return (
//     <main className="flex flex-col items-center mt-[10vh]">
//       {/* Formik Form */}
//       <Formik
//         initialValues={{
//           username: "",
//           email: "",
//           password: "",
//         }}
//         validationSchema={toFormikValidationSchema(signUpSchema)} // Zod validation with Formik
//         onSubmit={handleFormSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form
//             className="flex flex-col items-center bg-gray-900 p-8 w-full max-w-[500px] rounded-sm shadow-lg border-t-[10px] border-gray-400"
//           >
//             <h1 className="flex gap-2 items-center p-2 font-bold text-center">
//               Sign Up
//             </h1>
//             <p className="text-center text-sm text-gray-500">
//               Demo app, please don't use your real email or password
//             </p>

//             {/* Username Field */}
//             <Field
//               className="p-4 rounded-sm outline-none shadow-sm bg-gray-800 text-white mt-2 w-[300px]"
//               name="username"
//               type="text"
//               placeholder="Username"
//             />
//             <ErrorMessage
//               name="username"
//               component="div"
//               className="text-red-500 text-sm"
//             />

//             {/* Email Field */}
//             <Field
//               className="p-4 rounded-sm outline-none shadow-sm bg-gray-800 text-white mt-2 w-[300px]"
//               name="email"
//               type="email"
//               placeholder="Email"
//             />
//             <ErrorMessage
//               name="email"
//               component="div"
//               className="text-red-500 text-sm"
//             />

//             {/* Password Field */}
//             <Field
//               className="p-4 rounded-sm outline-none shadow-sm bg-gray-800 text-white mt-2 w-[300px]"
//               name="password"
//               type="password"
//               placeholder="Password"
//             />
//             <ErrorMessage
//               name="password"
//               component="div"
//               className="text-red-500 text-sm"
//             />

//             {/* Submit Button */}
//             <SubmitButton pendingText="Creating account...">
//               {isSubmitting || status === "loading" ? "Creating account..." : "Create Account"}
//             </SubmitButton>

//             {/* Error message from Redux */}
//             {error && <div className="text-red-500 mt-2">{error}</div>}

//             <Link className="text-gray-400 hover:underline mt-4" href="/sign-in">
//               Already have an account? Sign In
//             </Link>
//           </Form>
//         )}
//       </Formik>

//       <div className="w-[70%] h-[2px] bg-gray-400 mt-4 rounded-full" id="divider" />
//     </main>
//   );
// }
