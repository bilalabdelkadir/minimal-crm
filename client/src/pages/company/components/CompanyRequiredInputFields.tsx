import { Grid, NumberInput, TextInput } from "@mantine/core";
import React from "react";
import { type ICompanyForm, type IFormProps } from "../utils/company.interface";

const CompanyRequiredInputFields: React.FC<IFormProps<ICompanyForm>> = ({
  form,
}) => {
  return (
    <>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <TextInput
          label="Name"
          withAsterisk
          size="sm"
          placeholder="Easy crm"
          {...form.getInputProps("name")}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <TextInput
          label="Email"
          withAsterisk
          placeholder="email@company.com"
          {...form.getInputProps("email")}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <NumberInput
          label="Phone Number"
          placeholder="900000000"
          min={8}
          {...form.getInputProps("phone")}
          hideControls
        />
      </Grid.Col>
    </>
  );
};

export default CompanyRequiredInputFields;
