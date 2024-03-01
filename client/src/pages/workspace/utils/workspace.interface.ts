import { workspaceSchema } from "./workspace.schema";
import { z } from "zod";

export type IWorkspaceForm = z.infer<typeof workspaceSchema>;

export type IWorkspaceFormData = IWorkspaceForm & {
  logo: File;
};
