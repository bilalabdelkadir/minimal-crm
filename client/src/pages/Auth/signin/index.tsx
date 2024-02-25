import { Card, Image } from "@mantine/core";
import CrmDashboardImage from "../../../assets/fixed-crm.png";
import SocialAuth from "../signup/components/SocialAuth";
import { type ISigninForm } from "../shared/auth.interface";
import { signinSchema } from "../shared/auth.schema";
import { useForm, zodResolver } from "@mantine/form";
import { ROUTES } from "@/router/constant";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/store";
import { dispatchUser } from "../shared/userDispatcher";
import { SigninMutation } from "../shared/auth.query";
import { AxiosError } from "axios";
import {
  onErrorNotfication,
  onSuccessNotification,
} from "../shared/auth.utils";
import SigninTitle from "./components/SigninTitle";
import SignInForm from "./components/Signin.form";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate, isLoading } = SigninMutation(
    (error: AxiosError | any) => {
      onErrorNotfication(error);
    },
    (data) => {
      console.log(data);
      dispatchUser(data, dispatch);
      onSuccessNotification(data);
      navigate(ROUTES.WORKSPACE);
    },
  );

  const onSave = async (values: ISigninForm) => {
    try {
      mutate(values);
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  const form = useForm<ISigninForm>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: zodResolver(signinSchema),
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      <Card
        radius={10}
        withBorder
        className="w-80
  border
  border-gray-100
  bg-opacity-30
  bg-clip-padding py-6 shadow-xl backdrop-blur-md 
  backdrop-filter md:w-[50rem] lg:w-[55rem]
  "
      >
        <div className="sitems-center flex justify-around space-y-4">
          <div className="w-full px-1 md:w-[50%] md:px-9">
            <SigninTitle />
            <SocialAuth componentType="signin" />
            <SignInForm form={form} isLoading={isLoading} onSave={onSave} />
            <div>
              <p className="text-sm">
                don't have an account sign up{" "}
                <NavLink to={ROUTES.SIGN_UP}>here</NavLink>
              </p>
            </div>
          </div>

          <Image
            src={CrmDashboardImage}
            alt="crm dashboard"
            className="my-auto hidden h-full w-80 
                md:block md:h-96 md:w-96"
          />
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
