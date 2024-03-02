import { Group, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";

export function UploadProfile(props: Partial<DropzoneProps>) {
  return (
    <Dropzone
      onDrop={() => {}}
      onReject={(files) =>
        notifications.show({
          color: "red",
          message: "the fle is too large",
        })
      }
      maxSize={2 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      multiple={false}
      {...props}
    >
      <Group
        justify="center"
        gap="xl"
        mih={220}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            style={{
              width: rem(52),
              height: rem(52),
            }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{
              width: rem(52),
              height: rem(52),
            }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            style={{
              width: rem(52),
              height: rem(52),
            }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="lg" inline>
            Drag images here or click to select files
          </Text>
          <Text size="xs" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 2mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
