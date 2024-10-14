"use server";
import { SignInValues, SignUpValues, signUpSchema } from "./form-schemas";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AuthError } from "next-auth";
import { hashSync } from "bcryptjs";
import { signIn } from "@/auth";
import prisma from "./prisma";
import { redirect } from "next/navigation";

export const signInAction = async (signInValues: SignInValues) => {
  try {
    // await signIn("credentials", signInValues);
    const result = await signIn("credentials", {
      ...signInValues,
      redirect: false,
    });
    if (result?.error) {
      return { error: result.error };
    }
    // get user data
    const user = await prisma.user.findUnique({
      where: { email: signInValues.email },
      select: { id: true, email: true, username: true },
    });
    return { data: user };

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "An error occurred" };
      }
    }
    throw error;
  }
  redirect("/dashboard");
};

export const signUpAction = async (signUpValues: SignUpValues) => {
  const { data } = await signUpSchema.safeParseAsync(signUpValues);
  if (!data) return { error: "Invalid data" };
  try {
    await prisma.user.create({
      data: {
        ...data,
        password: hashSync(data.password, 10),
      },
    });
  } catch (error) {
    console.log("ERROR OCCURED SIGNUP ACTION", error);
    if (error instanceof PrismaClientKnownRequestError) {
      console.log(error.code);
      switch (error.code) {
        case "P2002":
          return { error: "Email already exists" };
        default:
          return { error: "An error occurred" };
      }
    }
    return { error: "An error occurred" };
  }
  redirect("/sign-in");
};
