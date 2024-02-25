import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/router/constant";

const PublicRoutes = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (user) {
    return <Navigate to={ROUTES.WORKSPACE} />;
  }

  return <Outlet />;
};

export default PublicRoutes;
