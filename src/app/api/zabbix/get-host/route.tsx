import { auth } from "@/lib/auth";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

type HostGroup = {
  groupid: string;
  name: string;
  flags: string;
  uuid: string;
};

export const GET = auth(async function POST(req) {
  try {
    if (req.auth) {
      //const json = await req.json();

      const apiUrl = process.env.APP_ZABBIX_API_URL;
      const auth = process.env.APP_ZABBIX_AUTH_TOKEN;

      if (!apiUrl || !auth) {
        throw new Error(
          "API URL or Auth token is missing in the environment variables."
        );
      }

      const requestBody = {
        jsonrpc: "2.0",
        method: "hostgroup.get",
        params: {
          output: "extend",
        },
        id: 1,
      };

      try {
        const response = await axios.post(apiUrl, requestBody, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        });

        if (response.data.error) {
          throw new Error(response.data.error.data);
        }

        return NextResponse.json(
          {
            result: response.data.result.map((group: HostGroup) => ({
              groupid: group.groupid,
              name: group.name,
              flags: group.flags,
              uuid: group.uuid,
            })),
          },
          { status: 200 }
        );
      } catch (error) {
        if (error instanceof AxiosError) {
          return NextResponse.json(
            {
              message: error.response
                ? error.response.data.error.data
                : "Network error",
            },
            { status: 500 }
          );
        }

        if (error instanceof Error) {
          return NextResponse.json(
            {
              message: error.message,
            },
            { status: 500 }
          );
        }
      }
    } else {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        {
          status: 403,
        }
      );
    }
  }
});
