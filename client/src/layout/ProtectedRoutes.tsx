import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/router/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import RequestOtp from "@/pages/auth/otp";

const ProtectedRoutes = () => {
  const auth = useSelector((state: RootState) => state.auth);

  axios.defaults.headers.common["Authorization"] = `Bearer ${auth.accessToken}`;

  if (!auth.user) {
    return <Navigate to={ROUTES.SIGN_IN} />;
  }

  return auth.user.isEmailVerified ? <Outlet /> : <RequestOtp />;
};

export default ProtectedRoutes;
