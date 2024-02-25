import { useAppDispatch } from "../../../store/store";
import {
  setUser,
  setAccessToken,
  setRefreshToken,
} from "../../../store/slice/auth.slice";
import { type IOtpResponse } from "./auth.interface";

export const dispatchUser = (
  data: IOtpResponse,
  dispatch: ReturnType<typeof useAppDispatch>,
) => {
  dispatch(setUser(data.user));
  dispatch(setAccessToken(data.accessToken));
  dispatch(setRefreshToken(data.refreshToken));
};
