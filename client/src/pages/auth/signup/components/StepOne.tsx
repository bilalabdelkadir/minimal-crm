import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React from "react";
import { ISignupForm } from "../../shared/auth.interface";

export interface IStepComponentProps {
  form: UseFormReturnType<ISignupForm>;
}

const StepOne: React.FC<IStepComponentProps> = ({ form }) => {
  return (
    <>
      <TextInput
        label="Fist name"
        placeholder="John"
        {...form.getInputProps("firstName")}
      />
      <TextInput
        label="Last name"
        placeholder="Doe"
        {...form.getInputProps("lastName")}
      />
      <TextInput
        label="Email"
        placeholder="example@mail.com"
        {...form.getInputProps("email")}
      />
    </>
  );
};

export default StepOne;
