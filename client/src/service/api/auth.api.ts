import {
  IOtpData,
  IOtpResponse,
  ISignupForm,
  ISignupResponse,
} from '@/pages/Auth/shared/auth.interface';
import axiosInstance from '@/utils/apiInstance';
import endpoints from '@/utils/endpoint';
import { AxiosResponse } from 'axios';

export const signupUser = async (
  data: Omit<ISignupForm, 'confirmPassword'>
): Promise<AxiosResponse<ISignupResponse>> => {
  return await axiosInstance.post(endpoints.SIGNUP, data);
};

export const verifyOtp = async (
  data: IOtpData
): Promise<AxiosResponse<IOtpResponse>> => {
  return await axiosInstance.post(endpoints.VERIFY_OTP, data);
};
