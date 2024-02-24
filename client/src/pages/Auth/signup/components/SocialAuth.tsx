import { Button } from "@mantine/core";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

interface ISocialAuthProps {
  componentType?: "signup" | "signin";
}

const SocialAuth: React.FC<ISocialAuthProps> = ({
  componentType = "signup",
}) => {
  return (
    <div className="mb-2 flex flex-col space-y-2">
      <Button
        variant="outline"
        color="dark"
        fullWidth
        leftSection={<IconBrandGoogle size={20} />}
        size="sm"
      >
        {componentType === "signup" ? "Sign up" : "Sign in "}
        with Google
      </Button>
      <Button
        variant="outline"
        color="dark"
        size="sm"
        fullWidth
        leftSection={<IconBrandGithub size={20} />}
      >
        {componentType === "signup" ? "Sign up" : "Sign in "}
        with Github
      </Button>
    </div>
  );
};

export default SocialAuth;
