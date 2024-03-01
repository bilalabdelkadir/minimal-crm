import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { createWorkspace } from "@/service/api/workspace.api";

export const createWorkspaceMutation = (
  onError?: (error: AxiosError | any) => void,
  onSuccess?: (data: any) => void,
) => {
  return useMutation({ mutationFn: createWorkspace, onSuccess, onError });
};
