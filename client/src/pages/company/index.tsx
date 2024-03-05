import { ActionIcon, Button, Flex, Grid, Input, Title } from "@mantine/core";
import {
  IconFileImport,
  IconPlus,
  IconReload,
  IconSquarePlus,
  IconUpload,
} from "@tabler/icons-react";

const Company = () => {
  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-semibold">Companies</h1>
          <p className="text-sm font-light">
            create , edit , delete and list your companies here
          </p>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            mx={6}
            leftSection={<IconUpload size={24} />}
          >
            Import
          </Button>

          <Button variant="filled" leftSection={<IconPlus size={24} />}>
            New Company
          </Button>
          <ActionIcon size={"lg"} variant="outline" aria-label="reload">
            <IconReload size={24} />
          </ActionIcon>
        </div>
      </div>
    </>
  );
};

export default Company;
