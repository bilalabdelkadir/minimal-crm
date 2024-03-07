import React from "react";
import { ICompanyForm, IFormProps } from "../../utils/company.interface";
import { ActionIcon, Button, Grid, Popover, TextInput } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

interface IAddressInputProps extends IFormProps<ICompanyForm> {
  index: number;
}

const AddressInputFields: React.FC<IAddressInputProps> = ({ form, index }) => {
  return (
    <Grid
      gutter="xs"
      className="my-2 rounded-md border border-dashed border-gray-400 p-2 shadow-sm  lg:border-none lg:p-0 lg:shadow-none"
    >
      <Grid.Col span={{ base: 4, md: 2.2, lg: 2.2 }}>
        <TextInput
          size="xs"
          label="Country"
          placeholder="Pakistan"
          {...form.getInputProps(`addresses.${index}.country`)}
        />
      </Grid.Col>

      <Grid.Col span={{ base: 4, md: 2.2, lg: 2.2 }}>
        <TextInput
          size="xs"
          label="Street"
          placeholder="Street"
          {...form.getInputProps(`addresses.${index}.street`)}
        />
      </Grid.Col>

      <Grid.Col span={{ base: 4, md: 2.2, lg: 2.2 }}>
        <TextInput
          size="xs"
          label="City"
          placeholder="Lahore"
          {...form.getInputProps(`addresses.${index}.city`)}
        />
      </Grid.Col>

      <Grid.Col span={{ base: 4, md: 2.2, lg: 2.2 }}>
        <TextInput
          size="xs"
          label="State"
          placeholder="Punjab"
          {...form.getInputProps(`addresses.${index}.state`)}
        />
      </Grid.Col>

      <Grid.Col span={{ base: 4, md: 2.2, lg: 2.2 }}>
        <TextInput
          size="xs"
          label="Zip"
          placeholder="54000"
          {...form.getInputProps(`addresses.${index}.zip`)}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 2, md: 1, lg: 1 }} key={index}>
        <Popover
          position="bottom"
          withArrow
          shadow="md"
          onChange={(opened) => !opened}
        >
          {/* TODO: add better ui */}
          <Popover.Target>
            <div className="flex h-full items-end justify-center  pb-1">
              <ActionIcon size="md" variant="light" color="red">
                <IconTrash />
              </ActionIcon>
            </div>
          </Popover.Target>

          <Popover.Dropdown>
            <p className="text-xs">are you sure you want to delete?</p>
            <Button
              variant="filled"
              color="red"
              size="compact-xs"
              onClick={() => form.removeListItem("addresses", index)}
            >
              Yes
            </Button>
          </Popover.Dropdown>
        </Popover>
      </Grid.Col>
    </Grid>
  );
};

export default AddressInputFields;
