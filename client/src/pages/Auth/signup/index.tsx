import { Card, Image } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { SignupMutation } from "../shared/auth.query";
import { type AxiosError } from "axios";
import { signupSchema } from "../shared/auth.schema";
import SignupTitle from "./components/SignupTitle";
import { useState } from "react";
import SignupForm from "./components/Signup.form";
import Otp from "./components/Otp";
import { type IUser } from "@/types/User.type";
import CrmDashboardImage from "../../../assets/fixed-crm.png";
import {
  type ISignupForm,
  type ISignupResponse,
} from "../shared/auth.interface";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/router/constant";
import SocialAuth from "./components/SocialAuth";
import {
  onErrorNotfication,
  onSuccessNotification,
} from "../shared/auth.utils";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState<IUser | null>(null);

  const { isLoading, mutateAsync } = SignupMutation(
    (error: AxiosError | any) => {
      onErrorNotfication(error);
    },
    (data: ISignupResponse) => {
      onSuccessNotification(data);
      setUser(data.user);
      setStep(3);
    },
  );

  const onSave = async (values: ISignupForm) => {
    try {
      await mutateAsync(values);
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  const form = useForm<ISignupForm>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: zodResolver(signupSchema),
  });
  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      {step !== 3 && (
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
          {step !== 3 && (
            <>
              <div className="sitems-center flex justify-around space-y-4">
                <Image
                  src={CrmDashboardImage}
                  alt="crm dashboard"
                  className="my-auto hidden h-full w-80 
                md:block md:h-96 md:w-96"
                />
                <div className="w-full px-1 md:w-[50%] md:px-9">
                  <SignupTitle />
                  <SocialAuth />
                  <SignupForm
                    form={form}
                    onSave={onSave}
                    step={step}
                    setStep={setStep}
                    isLoading={isLoading}
                  />
                  <div>
                    <p className="text-sm">
                      Already signed up login{" "}
                      <NavLink to={ROUTES.SIGN_IN}>here</NavLink>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </Card>
      )}

      {step === 3 && user?.id && (
        <Card
          radius={10}
          withBorder
          className="
          w-[90%]
          border
      border-gray-100
      bg-opacity-30 bg-clip-padding py-6 shadow-xl 
      backdrop-blur-md backdrop-filter md:w-[40%] lg:w-[50%]"
        >
          <Otp userId={user.id} />
        </Card>
      )}
    </div>
  );
};

export default SignUp;
