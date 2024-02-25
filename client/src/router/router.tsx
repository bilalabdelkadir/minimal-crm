import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./constant";
import SignUp from "@/pages/auth/signup";
import WorkSpace from "@/pages/workspace";
import SignIn from "@/pages/auth/signin";
import PublicRoutes from "@/layout/PublicRoutes";
import ProtectedRoutes from "@/layout/ProtectedRoutes";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    element: <PublicRoutes />,
    children: [
      {
        path: ROUTES.SIGN_UP,
        element: <SignUp />,
      },
      {
        path: ROUTES.SIGN_IN,
        element: <SignIn />,
      },
    ],
  },

  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: ROUTES.WORKSPACE,
        element: <WorkSpace />,
      },
    ],
  },
]);

export default Router;
