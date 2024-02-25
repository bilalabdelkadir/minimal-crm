import React, { useState } from "react";
import { Button, PinInput } from "@mantine/core";
import { VerifyOtpMutation } from "@/pages/Auth/shared/auth.query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/router/constant";
import { IOtpResponse } from "../../shared/auth.interface";
import {
  onErrorNotfication,
  onSuccessNotification,
} from "../../shared/auth.utils";
import { dispatchUser } from "../../shared/userDispatcher";
import { useAppDispatch } from "@/store/store";
interface OtpProps {
  userId: string;
}

const Otp: React.FC<OtpProps> = ({ userId }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [error, setError] = useState(false);
  const { mutate, isLoading } = VerifyOtpMutation(
    (error: AxiosError | any) => {
      setError(true);
      onErrorNotfication(error);
    },
    (data: IOtpResponse) => {
      console.log(data);
      dispatchUser(data, dispatch);
      onSuccessNotification(data);
      navigate(ROUTES.WORKSPACE);
    },
  );

  const onCompleted = (otp: number) => {
    const data = { otp, userId };
    console.log(data);
    mutate(data);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4 p-4 ">
      <h1 className="text-2xl font-bold">Verify OTP</h1>
      <p className="text-center text-sm text-gray-500">
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
      {/* TODO: add otp state */}
      <Button
        size="lg"
        onChange={() => {
          setError(false);
        }}
        className="w-full"
        loading={isLoading}
      >
        Verify OTP
      </Button>
    </div>
  );
};

export default Otp;
