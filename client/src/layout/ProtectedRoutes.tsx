import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/router/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ProtectedRoutes = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Navigate to={ROUTES.SIGN_IN} />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
