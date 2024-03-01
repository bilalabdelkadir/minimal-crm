import {
  Button,
  Container,
  Stack,
  Modal,
  Text,
  TextInput,
  Title,
  ScrollArea,
  ModalBody,
  Image,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconNewSection } from "@tabler/icons-react";
import { useForm, zodResolver } from "@mantine/form";
import { workspaceSchema } from "./utils/workspace.schema";
import { UploadProfile } from "./components/UploadPicture";
import { IWorkspaceForm } from "./utils/workspace.interface";
import { useEffect, useState } from "react";
import { FileWithPath } from "@mantine/dropzone";
import { AxiosError } from "axios";
import {
  onErrorNotfication,
  onSuccessNotification,
} from "../auth/shared/auth.utils";
import { createWorkspaceMutation } from "./query/workspace.query";

const WorkSpace = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [uploadedPicture, setUploadedPicture] = useState<FileWithPath[] | null>(
    null,
  );

  useEffect(() => {
    console.log(uploadedPicture?.[0].path);
  }, [uploadedPicture]);

  const handleUpload = (file: FileWithPath[]) => {
    setUploadedPicture(file);
    form.setFieldValue("logo", file[0]);
  };

  const isMobile = useMediaQuery("(max-width: 35em)");

  const form = useForm<IWorkspaceForm>({
    initialValues: {
      name: "",
      country: "",
      description: "",
      website: "",
    },

    validate: zodResolver(workspaceSchema),
  });

  const { mutate, isLoading: isCreating } = createWorkspaceMutation(
    (error: AxiosError | any) => {
      onErrorNotfication(error);
    },
    () => {
      form.reset();
      setUploadedPicture(null);
      close();
      onSuccessNotification({ message: "Workspace created successfully" });
    },
  );

  const onSave = (values: IWorkspaceForm) => {
    console.log(values);
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    if (uploadedPicture) {
      formData.append("logo", uploadedPicture[0]);
    }

    try {
      mutate(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Stack h={"100vh"} mt={"md"} justify="flex-start" align="center">
          <Button
            size="md"
            className="w-[30rem]"
            variant="outline"
            leftSection={<IconNewSection size={24} />}
            onClick={open}
          >
            Create Workspace
          </Button>
        </Stack>
      </Container>
      <Modal
        opened={opened}
        size="md"
        withOverlay
        onClose={close}
        fullScreen={isMobile}
        transitionProps={{ transition: "pop-top-right", duration: 200 }}
        scrollAreaComponent={ScrollArea.Autosize}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        centered
      >
        <Title order={2} className="">
          Create a workspace
        </Title>
        <Text size="sm" className=" mb-4">
          you can switch between workspace to controll multiple companies
        </Text>

        <ModalBody>
          {uploadedPicture && (
            <Image
              src={URL.createObjectURL(uploadedPicture[0])}
              alt="workspace profile"
              radius={"sm"}
              w={"40%"}
              height={"150px"}
              fit="cover"
              className="mx-auto"
            />
          )}
          {!uploadedPicture && (
            <UploadProfile onDrop={(file) => handleUpload(file)} />
          )}
          <form
            onSubmit={form.onSubmit((values) => onSave(values))}
            className="mt-6"
          >
            <TextInput
              label="Name"
              placeholder="easypeasy crm"
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Description"
              placeholder="blah blah blah, blah blah blah blah, blah! , blah"
              {...form.getInputProps("description")}
            />
            <TextInput
              label="Country"
              placeholder="US"
              {...form.getInputProps("country")}
            />
            <TextInput
              label="Website"
              placeholder="easypeasy.com"
              {...form.getInputProps("website")}
            />
            <Button
              type="submit"
              fullWidth
              className="mt-6"
              loading={isCreating}
              loaderProps={{
                type: "dots",
              }}
            >
              Save
            </Button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default WorkSpace;
