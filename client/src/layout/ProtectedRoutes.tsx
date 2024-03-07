import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/router/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import RequestOtp from "@/pages/auth/otp";
import axiosInstance from "@/utils/apiInstance";

const ProtectedRoutes = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const selectedWorkspace = useSelector(
    (state: RootState) => state.workspaceInfo.selectedWorkspace?.id,
  );

  axiosInstance.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
  // set x-worspace-id header
  axiosInstance.defaults.headers.common["x-workspace-id"] = selectedWorkspace;
  axiosInstance.defaults.headers.common["Authorization"] =
    `Bearer ${auth.accessToken}`;
  axiosInstance.defaults.headers.post["Authorization"] =
    `Bearer ${auth.accessToken}`;
  axiosInstance.defaults.headers.patch["Authorization"] =
    `Bearer ${auth.accessToken}`;
  axiosInstance.defaults.headers.delete["Authorization"] =
    `Bearer ${auth.accessToken}`;

  if (!auth.user) {
    return <Navigate to={ROUTES.SIGN_IN} />;
  }

  return auth.user.isEmailVerified ? <Outlet /> : <RequestOtp />;
};

export default ProtectedRoutes;
