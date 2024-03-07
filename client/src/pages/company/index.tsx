import { ActionIcon, Button, Modal, ScrollArea } from "@mantine/core";

import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  IconPlus,
  IconReload,
  IconUpload,
  IconXboxX,
} from "@tabler/icons-react";
import CompanyForm from "./components/Company.form";

const Company = () => {
  const isMobile = useMediaQuery("(max-width: 50em)");

  const [openedCompanyModal, companyModalHandler] = useDisclosure(false);

  return (
    <>
      <div className="flex h-16 items-start justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-semibold">Companies</h1>
          <p className="text-sm font-semibold">
            Create , Edit , Delete and list your companies here
          </p>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            mx={6}
            leftSection={<IconUpload size={20} />}
          >
            Import
          </Button>

          <Button
            variant="filled"
            leftSection={<IconPlus size={20} />}
            onClick={companyModalHandler.open}
          >
            New Company
          </Button>
          <ActionIcon size={"lg"} variant="outline" aria-label="reload">
            <IconReload size={20} />
          </ActionIcon>
        </div>
      </div>
      <Modal
        opened={openedCompanyModal}
        onClose={companyModalHandler.close}
        title="Company"
        size={"xl"}
        fullScreen={isMobile}
        scrollAreaComponent={ScrollArea.Autosize}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        closeButtonProps={{
          icon: <IconXboxX size={20} stroke={1.5} />,
        }}
      >
        <CompanyForm companyModalHandler={companyModalHandler} />
      </Modal>
    </>
  );
};

export default Company;
