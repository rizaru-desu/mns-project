"use server";

import { prisma } from "@/lib/prisma";

export const getQueryStringMap = async () => {
  try {
    return prisma.$transaction(async (tx) => {
      const zabbixSaverity = await tx.stringMap.findMany({
        where: { objectCategory: "Zabbix" },
      });

      const prtgSaverity: { value: string; objectName: string }[] = [];
      return {
        zabbixSaverity,
        prtgSaverity,
      };
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    }
  }
};
