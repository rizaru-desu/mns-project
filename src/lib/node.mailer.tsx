"use strict";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  secure: false, //true for 465, false for other ports
});

export default async function sendMailer({
  send,
  subject,
  cc,
  html,
}: {
  send: string;
  subject: string;
  cc?: string;
  html: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: '"no-reply" rizal.rizarudesu@gmail.com',
      cc: cc,
      to: send,
      subject: subject,
      html: html, // use the html parameter passed to the function
    });

    return info;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
