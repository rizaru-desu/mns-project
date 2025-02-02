"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const getQueryCreateUser = ({
  password,
  email,
  phone,

  fullname,
}: {
  email: string;
  password: string;
  phone: string;

  fullname: string;
}) => {
  try {
    return prisma.$transaction(async (tx) => {
      const checkEmal = await tx.user.findFirst({
        where: { email },
      });

      if (checkEmal) {
        throw new Error(`Email ${checkEmal.email} already exist.`);
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const userCreate = await tx.user.create({
        data: {
          email,
          username: email.split("@")[0],
          password: hash,
          name: fullname,
          phone,
        },
      });

      return userCreate;
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    }
  }
};

export const gettQueryTotp = async ({
  email,
  secret,
}: {
  email: string;
  secret: string;
}) => {
  try {
    return prisma.$transaction(async (tx) => {
      const upsertData = await tx.totp.upsert({
        where: {
          email,
        },
        update: {
          secret,
        },
        create: {
          email,
          secret,
        },
      });

      return upsertData;
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    }
  }
};
