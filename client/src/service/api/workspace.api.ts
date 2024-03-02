import { IWorkspaceFormData } from "@/pages/workspace/utils/workspace.interface";
import { IWorkspaceResponse } from "@/types/Workspace.type";
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

export const fetchWorksapces = async (): Promise<
  AxiosResponse<IWorkspaceResponse[]>
> => {
  return await axiosInstance.get<IWorkspaceResponse[]>(
    endpoints.FETCH_WORKSPACE,
  );
};
