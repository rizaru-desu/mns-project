"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import speakeasy from "speakeasy";

export const getQueryLoginUser = async ({
  password,
  email,
  otp,
}: {
  email: string;
  password: string;
  otp: string;
}) => {
  try {
    return prisma.$transaction(async (tx) => {
      const findOtpSecret = await tx.totp.findFirst({
        where: { email },
      });

      const validateToken = speakeasy.totp.verify({
        secret: findOtpSecret?.secret as string,
        encoding: "base32",
        token: otp,
        window: 6,
      });

      if (!validateToken) {
        throw new Error("Invalid otp, please send again");
      }

      await tx.totp.deleteMany({
        where: { email },
      });

      const findUser = await tx.user.findFirst({
        where: { email },
      });

      if (!findUser) {
        throw new Error("Account not found.");
      }

      if (!findUser.password) {
        throw new Error("Password not found.");
      }

      const matchPassword = await bcrypt.compare(password, findUser.password);

      if (!matchPassword) {
        throw new Error("Password incorrect.");
      }

      if (!findUser.isActive) {
        throw new Error(
          "Your account inactive, please contact customer support."
        );
      }

      return findUser;
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    }
  }
};

export const getQueryUserPhone = async ({ email }: { email: string }) => {
  try {
    return prisma.$transaction(async (tx) => {
      const findUser = await tx.user.findFirst({
        where: { email },
      });

      if (!findUser) {
        throw new Error("Account not found.");
      }

      return { Phone: findUser.phone };
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    }
  }
};
