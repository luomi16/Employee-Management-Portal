// userResolvers.ts

import {
  PrismaClient,
} from "@prisma/client";
import { hash, compare } from "bcryptjs";
import * as nodemailer from "nodemailer";

import { generateToken } from "@/graphql/utils/tokens";

const prisma = new PrismaClient();

export const UserResolvers = {
  Query: {
    // Resolver to get a list of all users
    users: async () => {
      return prisma.user.findMany();
    },
    // Resolver to get a user by ID
    userById: async (_parent: any, args: { id: string }) => {
      return prisma.user.findUnique({
        where: { id: args.id },
      });
    },

    // resolever to get send registration token history
    registrationTokenHistory: async () => {
      return prisma.registrationToken.findMany();
    },
  },

  Mutation: {
    // Resolver to create a new user
    createUser: async (
      _parent: any,
      args: { username: string; email: string; password: string; image: string }
    ) => {
      const hashedPassword = await hash(args.password, 10);

      return prisma.user.create({
        data: {
          username: args.username,
          email: args.email,
          password: hashedPassword,
          image: args.image,
        },
      });
    },

    // resolver to signIn
    signIn: async (_parent: any, args: { email: string; password: string }) => {
      const user = await prisma.user.findUnique({
        where: { email: args.email },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const isValidPassword = await compare(args.password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }

      // Optionally, you can return only necessary fields or include a token
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        image: user.image,
        // Include any other fields you want to return
      };
    },

    // Resolver to send a registration token for an employee
    sendRegistrationToken: async (
      _parent: any,
      args: { name: string; email: string }
    ) => {
      const { name, email } = args;

      // Generate a unique registration token
      const token = generateToken(
        email,
        name,
        process.env.JWT_SECRET || "your-secret-key"
      );
      const tokenExpiration = new Date(Date.now() + 3 * 60 * 60 * 1000); // Token expires in 3 hours

      // Save the token to the database
      const registrationToken = await prisma.registrationToken.create({
        data: {
          email,
          name,
          token,
          tokenExpiration,
        },
      });

      // Send the email with Nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const registrationLink = `http://localhost:3000/sign-up?token=${registrationToken.token}`;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Employee Registration Link",
        text: `Hello ${name},\n\nClick the following link to complete your registration: ${registrationLink}\n\nThis link is valid for 3 hours.`,
      };

      await transporter.sendMail(mailOptions);

      return { success: true, message: "Registration token sent successfully" };
    },
  },
};
