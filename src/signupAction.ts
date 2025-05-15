"use server";
import { prisma } from "./prisma";
import { schema } from "./zod";

const signUp = async (email: string, password: string) => {
  try {
    const userEmail = email?.toString().toLowerCase();
    const userPassword = password?.toString();

    const existingUser = await prisma.user.findFirst({
      where: {
        email: userEmail,
      },
    });

    console.log("Existing user:", existingUser);

    if (existingUser) {
      console.log("User already exists");
      return {
        success: false,
        message: "User already exists",
      };
    }

    console.log("Creating new user with email:", userEmail);

    const validatedData = schema.parse({
      email: userEmail,
      password: userPassword,
    });

    await prisma.user.create({
      data: {
        email: validatedData.email.toLowerCase(),
        password: validatedData.password,
      },
    });
    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error) {
    console.error("Error in signUp:", error);
    return {
      success: false,
      message: "An error occurred during sign up",
    };
  }
};

export { signUp };
