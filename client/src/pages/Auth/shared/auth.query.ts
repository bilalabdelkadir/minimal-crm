import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { signupUser, verifyOtp } from '@/service/api/auth.api';

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
