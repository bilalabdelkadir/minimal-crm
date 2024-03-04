import React from 'react';
import { IStepComponentProps } from './StepOne';
import { PasswordInput } from '@mantine/core';

const StepTwo: React.FC<IStepComponentProps> = ({ form }) => {
  return (
    <>
      <PasswordInput
        label="Password"
        placeholder="use strong password"
        {...form.getInputProps('password')}
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="confirm your password"
        {...form.getInputProps('confirmPassword')}
      />
    </>
  );
};

export default StepTwo;
