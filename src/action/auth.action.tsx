"use server";

import { getQueryCreateUser } from "@/controller/registerQuery";
import { createServerAction, ServerActionError } from "@/lib/action-utils";
import { signIn, signOut } from "@/lib/auth";
import dayjs from "dayjs";
import { CredentialsSignin } from "next-auth";
import speakeasy from "speakeasy";

export const getCode = createServerAction(async () => {
  try {
    const secret = speakeasy.generateSecret({ length: 20 });

    const secondTime = dayjs().add(3, "minute").unix();

    const token = speakeasy.totp({
      secret: secret.base32,
      encoding: "base32",
      time: secondTime,
    });

    const minutes = dayjs(secondTime * 1000).diff(dayjs(), "minutes");

    return { otp: token, expired: minutes, secret };
  } catch (error) {
    if (error instanceof Error) {
      throw new ServerActionError(error.message);
    }
  }
});

export const authenticate = createServerAction(
  async ({ password, username }: { password: string; username?: string }) => {
    try {
      const auth = await signIn("credentials", {
        redirect: false,
        redirectTo: "/pages/dashboard/zabbix",
        password,
        username,
      });

      return auth;
    } catch (error) {
      const someError = error as CredentialsSignin;

      const cause = someError.cause as unknown as { err: string };
      throw new ServerActionError(cause?.err);
    }
  }
);

export const logout = createServerAction(async () => {
  await signOut({ redirect: true, redirectTo: "/" });
});

export const registerUser = createServerAction(
  async ({
    email,
    password,
    phone,
    fullname,
  }: {
    email: string;
    password: string;
    phone: string;
    fullname: string;
  }) => {
    try {
      const registerUser = await getQueryCreateUser({
        email,
        password,
        phone,
        fullname,
      });
      return registerUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new ServerActionError(error.message);
      }
    }
  }
);
