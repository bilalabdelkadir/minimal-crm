import { Button, Card } from "@mantine/core";
import { useSelector } from "react-redux";
import Otp from "../signup/components/Otp";
import { requestOtpMutation } from "../shared/auth.query";
import {
  onErrorNotfication,
  onSuccessNotification,
} from "../shared/auth.utils";
import { RootState } from "@/store/store";
import axios from "axios";
import axiosInstance from "@/utils/apiInstance";

const RequestOtp = () => {
  const user = useSelector((state: RootState) => state.auth);

  axiosInstance.defaults.headers.common["Authorization"] =
    `Bearer ${user.accessToken}`;

  const { mutate, isLoading } = requestOtpMutation(
    (error) => {
      console.log(error);
      onErrorNotfication(error);
    },
    (data) => {
      console.log(data);
      onSuccessNotification(data);
    },
  );

  const handleRequestNewOtp = () => {
    mutate();
  };

  return (
    <div
      className="mx-auto flex h-screen
    items-center
     justify-center bg-gradient-to-r from-blue-500
      to-green-400 md:w-[50%] lg:w-[40%]"
    >
      <Card
        radius={10}
        withBorder
        className="w-[90%] border 
        border-gray-100 bg-opacity-30 bg-clip-padding py-6 
        shadow-xl backdrop-blur-md backdrop-filter"
      >
        <Otp userId={user.user?.id as string} />
        <Button
          size="md"
          variant="transparent"
          className="mx-auto w-[95%]"
          loading={isLoading}
          onClick={handleRequestNewOtp}
        >
          Request new OTP
        </Button>
      </Card>
    </div>
  );
};

export default RequestOtp;
