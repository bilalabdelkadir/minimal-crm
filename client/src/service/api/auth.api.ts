import {
  ISigninForm,
  type IOtpData,
  type IOtpResponse,
  type ISignupForm,
  type ISignupResponse,
} from "@/pages/Auth/shared/auth.interface";
import axiosInstance from "@/utils/apiInstance";
import endpoints from "@/utils/endpoint";
import { AxiosResponse } from "axios";

export const signupUser = async (
  data: Omit<ISignupForm, "confirmPassword">,
): Promise<AxiosResponse<ISignupResponse>> => {
  return await axiosInstance.post<ISignupResponse>(endpoints.SIGNUP, data);
};

export const signinUser = async (
  data: ISigninForm,
): Promise<AxiosResponse<ISignupResponse>> => {
  return await axiosInstance.post<IOtpResponse>(endpoints.SIGNIN, data);
};

export const verifyOtp = async (
  data: IOtpData,
): Promise<AxiosResponse<IOtpResponse>> => {
  return await axiosInstance.post<IOtpResponse>(endpoints.VERIFY_OTP, data);
};

export const requestOtp = async (): Promise<AxiosResponse<ISignupResponse>> => {
  return await axiosInstance.get<ISignupResponse>(endpoints.REQUEST_OTP);
};
