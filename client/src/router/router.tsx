import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./constant";
import SignUp from "@/pages/auth/signup";
import WorkSpace from "@/pages/workspace";
import SignIn from "@/pages/auth/signin";
import PublicRoutes from "@/layout/PublicRoutes";
import ProtectedRoutes from "@/layout/ProtectedRoutes";
import RequestOtp from "@/pages/auth/otp";
import AppLayout from "@/layout/AppLayout";

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
        path: ROUTES.APP,
        element: <AppLayout />,
        children: [
          {
            path: "/app/test1",
            element: <h1>this is from test</h1>,
          },
          {
            path: "/app/test2",
            element: <h1>this is from test 2</h1>,
          },
        ],
      },
      {
        path: ROUTES.WORKSPACE,
        element: <WorkSpace />,
      },
      {
        path: ROUTES.REQUEST_OTP,
        element: <RequestOtp />,
      },
    ],
  },
]);

export default Router;
