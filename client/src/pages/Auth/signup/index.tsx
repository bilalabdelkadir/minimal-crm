import { Card, Flex } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { SignupMutation } from '../shared/auth.query';
import { type AxiosError } from 'axios';
import { signupSchema } from '../shared/auth.schema';
import { notifications } from '@mantine/notifications';
import SignupTitle from './components/Title';
import { useState } from 'react';
import SignupForm from './components/Signup.form';
import Otp from './components/Otp';
import { IUser } from '@/types/User.type';
import {
  type ISignupForm,
  type ISignupResponse,
} from '../shared/auth.interface';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState<IUser | null>(null);
  const onError = (error: AxiosError | any) => {
    console.log(error);
    notifications.show({
      title: 'Error',
      autoClose: 5000,
      message:
        error?.response?.data.message || error?.message || 'An error occurred',
      color: 'red',
    });
  };

  const { isLoading, mutateAsync } = SignupMutation(
    (error: AxiosError | any) => {
      onError(error);
    },
    (data: ISignupResponse) => {
      console.log(data);
      notifications.show({
        title: 'Success',
        autoClose: 5000,
        message: data.message,
        color: 'green',
      });

      setUser(data.user);
      setStep(3);
    }
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: zodResolver(signupSchema),
  });
  return (
    <Flex
      gap="md"
      wrap="wrap"
      className="flex flex-col items-center justify-center min-h-screen "
    >
      <Card
        padding={20}
        radius={10}
        withBorder
        className="w-80
      md:w-96
      shadow-xl
      
      "
      >
        {step !== 3 && (
          <>
            <SignupTitle />
            <SignupForm
              form={form}
              onSave={onSave}
              step={step}
              setStep={setStep}
              isLoading={isLoading}
            />
          </>
        )}
        {step === 3 && user?.id && <Otp userId={user.id} />}
      </Card>
    </Flex>
  );
};

export default SignUp;
