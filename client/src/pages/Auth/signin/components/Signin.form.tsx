import { type UseFormReturnType } from "@mantine/form";
import { type ISigninForm } from "../../shared/auth.interface";
import React from "react";
import { Button, PasswordInput, TextInput } from "@mantine/core";

interface ISigninFormProps {
  form: UseFormReturnType<ISigninForm>;
  onSave: (values: ISigninForm) => void;
  isLoading: boolean;
}
const SignInForm: React.FC<ISigninFormProps> = ({
  form,
  isLoading,
  onSave,
}) => {
  return (
    <>
      <form onSubmit={form.onSubmit(onSave)}>
        <TextInput
          label="Email"
          placeholder="example@mail.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="use strong password"
          {...form.getInputProps("password")}
        />
        <Button
          type="submit"
          fullWidth
          className="mt-6"
          loading={isLoading}
          loaderProps={{
            type: "dots",
          }}
        >
          Sign In
        </Button>
      </form>
    </>
  );
};

export default SignInForm;
