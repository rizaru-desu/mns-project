"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { createServerAction, ServerActionError } from "@/lib/action-utils";

export const getQueryUserById = async ({ id }: { id: string }) => {
  try {
    return prisma.$transaction(async (tx) => {
      return await tx.user.findUnique({
        where: {
          id,
        },
        select: {
          email: true,
          name: true,
          phone: true,
          username: true,
        },
      });
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    }
  }
};

export const getQueryUser = async ({
  page,
  pageSize,
  filter,
}: {
  page: number;
  pageSize: number;
  filter: string;
}) => {
  try {
    return prisma.$transaction(async (tx) => {
      const users = await tx.user.findMany({
        where: {
          isAdmin: { not: true },
          OR: [
            { email: { contains: filter, mode: "insensitive" } },
            { name: { contains: filter, mode: "insensitive" } },
          ],
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      const total = await tx.user.count({
        where: {
          isAdmin: { not: true },
          OR: [
            { email: { contains: filter, mode: "insensitive" } },
            { name: { contains: filter, mode: "insensitive" } },
          ],
        },
      });

      return { users, total };
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    }
  }
};

export const settQueryUserActive = async ({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) => {
  try {
    return prisma.$transaction(async (tx) => {
      return await tx.user.update({
        where: {
          id,
        },
        data: {
          isActive,
        },
      });
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    }
  }
};

export const settQueryUserZabbixAgent = async ({
  id,
  zabbixGroupId,
  by,
}: {
  id: string;
  zabbixGroupId: string;
  by: string;
}) => {
  try {
    return prisma.$transaction(async (tx) => {
      return await tx.user.update({
        where: {
          id,
        },
        data: {
          zabbixGroupId,
          updatedBy: by,
        },
      });
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    }
  }
};

export const setQueryUserUpdtePass = createServerAction(
  async ({ id, password }: { id: string; password: string }) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      return prisma.$transaction(async (tx) => {
        return await tx.user.update({
          where: {
            id,
          },
          data: {
            password: hash,
          },
        });
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new ServerActionError(error.message);
      }
    }
  }
);
