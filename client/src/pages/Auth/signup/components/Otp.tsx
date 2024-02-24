import React, { useState } from 'react';
import { Button, PinInput } from '@mantine/core';
import { VerifyOtpMutation } from '@/pages/Auth/shared/auth.query';
import { AxiosError } from 'axios';
import { useAppDispatch } from '@/store/store';
import { setAccessToken, setUser } from '@/store/slice/auth.slice';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/constant';
interface OtpProps {
  userId: string;
}

const Otp: React.FC<OtpProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const { mutate } = VerifyOtpMutation(
    (error: AxiosError | any) => {
      setError(true);
      notifications.show({
        title: 'Error',
        autoClose: 5000,
        message:
          error?.response?.data.message ||
          error?.message ||
          'An error occurred',
        color: 'red',
      });
    },
    (data) => {
      console.log(data);
      dispatch(setUser(data.user));
      dispatch(setAccessToken(data.accessToken));
      dispatch(setAccessToken(data.refreshToken));
      notifications.show({
        title: 'Success',
        autoClose: 3000,
        message: 'OTP verified successfully',
        color: 'green',
      });
      navigate(ROUTES.WORKSPACE);
    }
  );

  const onCompleted = (otp: number) => {
    const data = { otp, userId };
    console.log(data);
    mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 ">
      <h1 className="text-2xl font-bold">Verify OTP</h1>
      <p className="text-gray-500 text-sm text-center">
        We have sent a 4 digit OTP to your email address
      </p>
      <PinInput
        size="lg"
        inputType="tel"
        inputMode="numeric"
        error={error}
        length={4}
        autoFocus
        onComplete={(values) => onCompleted(Number(values))}
      />
      <Button size="lg" variant="light" className="w-full">
        Verify OTP
      </Button>
    </div>
  );
};

export default Otp;
