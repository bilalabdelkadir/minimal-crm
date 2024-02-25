import React from 'react';
import { UseFormReturnType } from '@mantine/form';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import { Button } from '@mantine/core';
import { type ISignupForm } from '../../shared/auth.interface';
import { IconCaretRight, IconCaretLeft } from '@tabler/icons-react';

interface ISignupFormProps {
  form: UseFormReturnType<ISignupForm>;
  onSave: (values: ISignupForm) => void;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}

const SignupForm: React.FC<ISignupFormProps> = ({
  form,
  onSave,
  step,
  isLoading,
  setStep,
}) => {
  return (
    <>
      <form onSubmit={form.onSubmit(onSave)}>
        {step === 1 && <StepOne form={form} />}
        {step === 2 && <StepTwo form={form} />}
        {step === 2 && (
          <Button
            type="submit"
            fullWidth
            className="mt-6"
            loading={isLoading}
            loaderProps={{
              type: 'dots',
            }}
          >
            Sign Up
          </Button>
        )}
        {step === 1 && (
          <Button
            fullWidth
            className="mt-6 disabled:bg-opacity-45 disabled:text-white disabled:bg-purple-700"
            onClick={() => setStep(2)}
            rightSection={<IconCaretRight size={24} />}
            disabled={
              form.isValid('firstName') &&
              form.isValid('lastName') &&
              form.isValid('email')
                ? false
                : true
            }
          >
            Next
          </Button>
        )}
        {step === 2 && (
          <Button
            fullWidth
            className="mt-2"
            onClick={() => setStep(1)}
            variant="outline"
            leftSection={<IconCaretLeft size={23} />}
          >
            Back
          </Button>
        )}
      </form>
    </>
  );
};

export default SignupForm;
