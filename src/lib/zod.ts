import { z } from "zod";

export const otpSenderZod = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  type: z.number({ required_error: "Type is required" }),
});
