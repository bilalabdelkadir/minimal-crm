import { useMutation } from "react-query";
import { AxiosError } from "axios";
import {
  signinUser,
  signupUser,
  verifyOtp,
  requestOtp,
} from "@/service/api/auth.api";

// TODO: fix captilization
export const SignupMutation = (
  onError?: (error: AxiosError | any) => void,
  onSuccess?: (data: any) => void,
) => {
  return useMutation({ mutationFn: signupUser, onSuccess, onError });
};

export const SigninMutation = (
  onError?: (error: AxiosError | any) => void,
  onSuccess?: (data: any) => void,
) => {
  return useMutation({ mutationFn: signinUser, onSuccess, onError });
};

export const VerifyOtpMutation = (
  onError?: (error: AxiosError | any) => void,
  onSuccess?: (data: any) => void,
) => {
  return useMutation({ mutationFn: verifyOtp, onSuccess, onError });
};

export const requestOtpMutation = (
  onError?: (error: AxiosError | any) => void,
  onSuccess?: (data: any) => void,
) => {
  return useMutation({ mutationFn: requestOtp, onSuccess, onError });
};
