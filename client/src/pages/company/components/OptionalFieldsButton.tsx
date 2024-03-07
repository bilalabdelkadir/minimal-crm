// OptionalFieldsButton.tsx
import React from "react";
import { Button, Grid } from "@mantine/core";
import { IconArrowNarrowDown, IconArrowNarrowRight } from "@tabler/icons-react";

interface OptionalFieldsButtonProps {
  onClick: () => void;
  openedCollapse: boolean;
  btnTitle: string;
}

const OptionalFieldsButton: React.FC<OptionalFieldsButtonProps> = ({
  onClick,
  openedCollapse,
  btnTitle,
}) => {
  return (
    <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
      <Button
        onClick={onClick}
        variant="white"
        className="w-[90%] md:w-[45%] lg:w-[32%]"
        leftSection={
          openedCollapse ? (
            <IconArrowNarrowDown size={20} />
          ) : (
            <IconArrowNarrowRight size={20} />
          )
        }
        justify="flex-start"
        radius={"xs"}
      >
        {btnTitle}
      </Button>
    </Grid.Col>
  );
};

export default OptionalFieldsButton;
