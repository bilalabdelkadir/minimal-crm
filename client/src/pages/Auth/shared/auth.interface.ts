import { IUser } from "@/types/User.type";
import { signinSchema, signupSchema } from "./auth.schema";
import { z } from "zod";

export interface ISignupResponse {
  message: string;
  user: IUser;
}

export interface IOtpResponse {
  success: boolean;
  message: string;
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IOtpErrorResponse {
  success: boolean;
  message: string;
}

export interface IOtpData {
  userId: string;
  otp: number;
}

export type ISignupForm = z.infer<typeof signupSchema>;
export type ISigninForm = z.infer<typeof signinSchema>;
