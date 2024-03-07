import { Button } from "@mantine/core";
import { IconDeviceFloppy, IconXboxX } from "@tabler/icons-react";
import React from "react";

interface ISaveAndCancelBtnProps {
  isLoading: boolean;
  onClick?: () => void;
  closeModal?: () => void;
}

const SaveAndCancelBtn: React.FC<ISaveAndCancelBtnProps> = ({
  isLoading,
  closeModal,
}) => {
  return (
    <div className="flex justify-end space-x-2 p-4">
      <Button
        variant="filled"
        leftSection={<IconDeviceFloppy size={20} />}
        type="submit"
        loading={isLoading}
      >
        Save
      </Button>
      <Button
        onClick={closeModal}
        variant="outline"
        leftSection={<IconXboxX size={20} />}
      >
        Cancel
      </Button>
    </div>
  );
};

export default SaveAndCancelBtn;
