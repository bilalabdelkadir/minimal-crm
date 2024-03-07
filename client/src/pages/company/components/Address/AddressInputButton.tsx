import React from "react";
import { ICompanyForm, IFormProps } from "../../utils/company.interface";
import { Button, Grid, Group, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

const AddressInputButton: React.FC<IFormProps<ICompanyForm>> = ({ form }) => {
  return (
    <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
      <Group justify="center" mt="md">
        <Tooltip
          color="orange"
          hidden={
            // @ts-ignore
            form.values.addresses?.length < 3
          }
          label={
            // @ts-ignore
            form.values.addresses?.length >= 3
              ? "You can add only 3 addresses"
              : null
          }
        >
          <Button
            fullWidth
            variant="outline"
            className="border-1 border-dashed "
            leftSection={<IconPlus size={20} />}
            onClick={() =>
              form.insertListItem("addresses", {
                country: "",
                street: "",
                city: "",
                state: "",
                zip: "",
              })
            }
            disabled={
              // @ts-ignore
              form.values.addresses?.length >= 3
            }
          >
            Add employee
          </Button>
        </Tooltip>
      </Group>
    </Grid.Col>
  );
};

export default AddressInputButton;
