import { ROUTES } from "@/router/constant";
import {
  setSelectedWorkspace,
  setWorkspaces,
} from "@/store/slice/workspaces.slice";
import { RootState, useAppDispatch } from "@/store/store";
import { IWorkspaceResponse } from "@/types/Workspace.type";
import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  Image,
  Modal,
  ModalBody,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconNewSection } from "@tabler/icons-react";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  onErrorNotfication,
  onSuccessNotification,
} from "../auth/shared/auth.utils";
import { UploadProfile } from "./components/UploadPicture";
import {
  createWorkspaceMutation,
  fetchWorkspacesQuery,
} from "./query/workspace.query";
import { IWorkspaceForm } from "./utils/workspace.interface";
import { workspaceSchema } from "./utils/workspace.schema";

const WorkSpace = () => {
  const isMobile = useMediaQuery("(max-width: 35em)");
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [uploadedPicture, setUploadedPicture] = useState<FileWithPath[] | null>(
    null,
  );

  const selectedWorkspace = useSelector(
    (state: RootState) => state.workspaceInfo.selectedWorkspace,
  );

  const handleUpload = (file: FileWithPath[]) => {
    setUploadedPicture(file);
    form.setFieldValue("logo", file[0]);
  };

  const { data: workspaces } = fetchWorkspacesQuery(["workspaces"]);
  const queryClient = useQueryClient();

  useEffect(() => {
    dispatch(setWorkspaces(workspaces || []));
  }, [workspaces]);

  const onSelectedWorkspace = (workspace: IWorkspaceResponse) => {
    dispatch(setSelectedWorkspace(workspace));
    navigate(ROUTES.APP);
  };

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
      queryClient.invalidateQueries("workspaces");
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
      <Container size="lg">
        <Stack justify="flex-start" align="center">
          <div className="rounded-sm pt-4">
            <Title
              order={isMobile ? 2 : 1}
              className="uppercase text-purple-700"
            >
              EasyPeasy CRM
            </Title>
          </div>
          <div className="mt-1 flex min-h-[70vh] w-full items-center justify-between md:mt-4 md:gap-3">
            <div className="h-full w-full border-2 border-gray-500 p-2 md:w-[60%] md:p-8">
              <h1 className="text-3xl font-bold md:text-4xl ">
                Create a new Easy-crm workspace
              </h1>
              <p className="text-base md:text-lg">
                Easy-crm gives your team a home – a place where they manage your
                sales and company. To create a new workspace, click on the
                button below.
              </p>
              <Button
                onClick={open}
                leftSection={<IconNewSection size={24} />}
                fullWidth
                className="my-4"
                size={isMobile ? "md" : "lg"}
              >
                Create a workspace
              </Button>
              <p className="text-xs">
                By continuing, you’re agreeing to our main services agreement,
                user terms of service and Slack supplemental Terms. Additional
                disclosures are available in our privacy policy and cookie
                policy.
              </p>
            </div>
            <div className="hidden h-[80%] w-[70%]  border-4 px-10  md:flex">
              <Image
                src={"https://gapsystudio.com/storage/2015/oblozka.png"}
                alt="dashboard picture"
                className="rounded-lg"
              />
            </div>
          </div>
          <p className="text-center">OR</p>
          <p className="w-[100wh] text-center text-lg font-bold text-gray-700">
            select a workspace
          </p>
          <div className="flex w-full flex-wrap justify-start gap-2 border-2 border-gray-600 bg-white shadow-md md:px-8 md:py-10">
            {workspaces?.map((workspace) => (
              <Card
                key={workspace.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                w={isMobile ? "100%" : "30%"}
              >
                <Card.Section>
                  <Image
                    src={
                      workspace.logo?.url ||
                      "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"
                    }
                    height={160}
                    alt={workspace.name}
                    className="h-40 w-full rounded-md object-contain"
                  />
                </Card.Section>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{workspace.name}</Text>

                  <div>
                    <Text fw={400} size="xs">
                      owned by
                    </Text>
                    <Badge color="green">{workspace.createdBy.firstName}</Badge>
                  </div>
                </Group>
                <Text size="sm" c="dimmed">
                  {workspace.description}
                </Text>
                <Button
                  color="dark"
                  fullWidth
                  mt="md"
                  radius="md"
                  disabled={selectedWorkspace?.id === workspace.id}
                  onClick={() => onSelectedWorkspace(workspace)}
                >
                  {selectedWorkspace?.id === workspace.id
                    ? "Selected"
                    : "Select"}
                </Button>
              </Card>
            ))}
          </div>
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
