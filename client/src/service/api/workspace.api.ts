import { IWorkspaceFormData } from "@/pages/workspace/utils/workspace.interface";
import axiosInstance from "@/utils/apiInstance";
import endpoints from "@/utils/endpoint";
import { AxiosResponse } from "axios";

export const createWorkspace = async (
  data: IWorkspaceFormData | FormData | any,
): Promise<AxiosResponse<any>> => {
  return await axiosInstance.postFormData<any>(
    endpoints.CREATE_WORKSPACE,
    data,
  );
};
