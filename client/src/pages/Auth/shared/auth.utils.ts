import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";

export const onErrorNotfication = (error: AxiosError | any) => {
  console.log(error);
  notifications.show({
    title: "Error",
    autoClose: 5000,
    message: error?.response?.data.message || "An error occurred",
    color: "red",
  });
};

export const onSuccessNotification = <T>(data: T | any, message?: string) => {
  notifications.show({
    title: "Success",
    autoClose: 5000,
    message: message
      ? message
      : data?.message
        ? data?.message
        : "action was successful",
    color: "green",
  });
};
