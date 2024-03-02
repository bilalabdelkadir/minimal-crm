import { useMutation, useQuery } from "react-query";
import { AxiosError } from "axios";
import { createWorkspace, fetchWorksapces } from "@/service/api/workspace.api";
import { IWorkspaceResponse } from "@/types/Workspace.type";

export const createWorkspaceMutation = (
  onError?: (error: AxiosError | any) => void,
  onSuccess?: (data: any) => void,
) => {
  return useMutation({ mutationFn: createWorkspace, onSuccess, onError });
};

export const fetchWorkspacesQuery = (
  queryKey: string[],
  onError?: (error: AxiosError | any) => void,
  onSuccess?: (data: IWorkspaceResponse[]) => void,
) => {
  return useQuery({ queryKey, queryFn: fetchWorksapces, onError, onSuccess });
};
