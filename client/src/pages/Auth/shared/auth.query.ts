import axiosInstance from '@/utils/apiInstance';
import {
  type IOtpData,
  type ISignupResponse,
  type IOtpResponse,
  type ISignupForm,
} from './auth.interface';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import endpoints from '@/utils/endpoint';
import { AxiosError } from 'axios';

const signupUser = async (
  data: Omit<ISignupForm, 'confirmPassword'>
): Promise<AxiosResponse<ISignupResponse>> => {
  return await axiosInstance.post(endpoints.SIGNUP, data);
};

export const verifyOtp = async (
  data: IOtpData
): Promise<AxiosResponse<IOtpResponse>> => {
  return await axiosInstance.post(endpoints.VERIFY_OTP, data);
};

export const SignupMutation = (
  onError?: (error: AxiosError | any) => void,
  onSuccess?: (data: any) => void
) => {
  return useMutation({ mutationFn: signupUser, onSuccess, onError });
};

export const VerifyOtpMutation = (
  onError?: (error: AxiosError | any) => void,
  onSuccess?: (data: any) => void
) => {
  return useMutation({ mutationFn: verifyOtp, onSuccess, onError });
};
