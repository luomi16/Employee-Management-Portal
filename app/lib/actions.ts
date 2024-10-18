import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import prisma from "@/lib/prisma";

// Existing authenticate function
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

// New getUserRole function
export async function getUserRole(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.role; // Assuming role is a field in your user model
  } catch (error) {
    throw new Error(`Failed to fetch user role: ${error}`);
  }
}
