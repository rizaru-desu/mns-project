import { getCode } from "@/action/auth.action";
import { otpBody } from "@/app/components/bodyOtpMail";
import { gettQueryTotp } from "@/controller/registerQuery";
import { auth } from "@/lib/auth";
import sendMailer from "@/lib/node.mailer";
import { otpSenderZod } from "@/lib/zod";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";
import _ from "lodash";
import { getQueryUserPhone } from "@/controller/loginQuery";

export const GET = auth(async function POST(req) {
  try {
    const json = await req.json();

    const { email, type } = await otpSenderZod.parseAsync(json);

    const getPhone = await getQueryUserPhone({ email });

    if (!getPhone) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const getCodes = await getCode();

    if (getCodes.success) {
      if (type === 1) {
        const requestBody = {
          to: `${getPhone.Phone}@c.us`,
          message: `
            [Hypernet]${"\n"}
            Kode OTP Anda: ${getCodes.value?.otp}${"\n"}
            Kode ini berlaku hingga ${getCodes.value?.expired} menit ke depan. Jangan berikan kode ini kepada siapa pun.${"\n"}
            Jika Anda tidak meminta kode ini, abaikan pesan ini.     
          `,
        };

        try {
          const response = await axios.post(
            "http://localhost:3030/whatsapp/send-message",
            requestBody,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.error) {
            throw new Error(response.data.error.data);
          }

          await gettQueryTotp({
            email: email,
            secret: getCodes.value?.secret.base32 as string,
          });

          return NextResponse.json(
            {
              message: "Check your whatsapp, message has been sent.",
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
        //sent to email

        const info = await sendMailer({
          send: email,
          subject: "TOTP Verification Code",
          html: otpBody({
            code: _.map(String(getCodes.value?.otp), _.toNumber),
          }),
        });

        if (info) {
          await gettQueryTotp({
            email: email,
            secret: getCodes.value?.secret.base32 as string,
          });

          return NextResponse.json(
            {
              message:
                "Check your email, message has been sent. Please check your spam folder if you don't receive the email.",
            },
            { status: 200 }
          );
        }
      }
    } else {
      return NextResponse.json(
        { message: getCodes.error },
        {
          status: 500,
        }
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
