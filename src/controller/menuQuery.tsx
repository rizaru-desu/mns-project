"use server";

import { prisma } from "@/lib/prisma";

export const getQueryMenu = async ({ id }: { id?: string }) => {
  try {
    return prisma.$transaction(async (tx) => {
      const getIsAdmin = await tx.user.findUnique({
        where: {
          id,
        },
        select: {
          isAdmin: true,
        },
      });

      // Fetch menus based on the user's admin status
      const getItemMenu = await tx.menu.findMany({
        where: getIsAdmin?.isAdmin
          ? undefined
          : {
              isAdmin: false,
            },
        include: {
          children: true,
        },
        orderBy: {
          name: "asc",
        },
      });

      return getItemMenu.filter((menu) => menu.parentId === null);
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    }
  }
};

export const getQueryTabSetting = async ({ id }: { id?: string }) => {
  try {
    return prisma.$transaction(async (tx) => {
      const getIsAdmin = await tx.user.findUnique({
        where: {
          id,
        },
        select: {
          isAdmin: true,
        },
      });

      if (getIsAdmin?.isAdmin) {
        return [
          {
            label: "Zabbix Panel",
            key: "2",
          },
          {
            label: "PRTG Panel",
            key: "3",
          },
        ];
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    }
  }
};
