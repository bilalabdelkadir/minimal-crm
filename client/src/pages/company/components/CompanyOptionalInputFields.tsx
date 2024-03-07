import React from "react";
import { ICompanyForm, IFormProps } from "../utils/company.interface";
import {
  Grid,
  TextInput,
  NumberInput,
  Select,
  MultiSelect,
  Button,
  TagsInput,
  Divider,
} from "@mantine/core";
import { IconWorldWww } from "@tabler/icons-react";
import { PreferredContactMethod } from "../utils/company.schema";
import AddressInput from "./Address/Address.input";
import ReferalSourceSelector from "./ReferalSourceSelector";

const CompanyOptionalInputFields: React.FC<IFormProps<ICompanyForm>> = ({
  form,
}) => {
  return (
    <>
      <Grid m={"lg"}>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <TextInput
            label="Secondary Email"
            placeholder="secondary@email.com"
            {...form.getInputProps("secondaryEmail")}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <NumberInput
            label="Mobile Number"
            placeholder="900000000"
            min={8}
            {...form.getInputProps("secondaryPhone")}
            hideControls
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Select
            label="Prefered Contact Method"
            placeholder="contact method"
            data={[
              { label: "Email", value: PreferredContactMethod.Email },
              { label: "Phone", value: PreferredContactMethod.Phone },
            ]}
            {...form.getInputProps("preferredContactMethod")}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <ReferalSourceSelector form={form} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <TextInput
            label="Preferred Currency"
            placeholder="USD"
            {...form.getInputProps("preferredCurrency")}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <TextInput
            label="Preferred Language"
            placeholder="English"
            {...form.getInputProps("preferredLanguage")}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <TextInput
            leftSection={<IconWorldWww size={20} />}
            label="website"
            placeholder="example.com"
            {...form.getInputProps("website")}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
          <MultiSelect
            label="Select Contacts"
            placeholder="Pick contacts"
            data={["Bilal", "Fahad", "Muna", "Ahmed"]}
            searchable
            nothingFoundMessage={
              <div className="flex items-center justify-between space-x-2">
                <Button justify="right">Add New Contact</Button>
              </div>
            }
            {...form.getInputProps("contacts")}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
          <TagsInput
            label="Press Enter to submit a tag"
            placeholder="Pick tag from list"
            maxTags={5}
            data={["React", "Angular", "Svelte"]}
            {...form.getInputProps("tags")}
          />
        </Grid.Col>
      </Grid>
      <Divider />
      <Grid m={"lg"}>
        <AddressInput form={form} />
      </Grid>
    </>
  );
};

export default CompanyOptionalInputFields;
