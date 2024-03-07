import axiosInstance from "@/utils/apiInstance";
import endpoints from "@/utils/endpoint";
import { AxiosResponse } from "axios";
import {
  ICompanyForm,
  ICompanyResponse,
} from "@/pages/company/utils/company.interface";
import { IQueryParams, ISourceType } from "@/types/Query.type";

export const createCompany = async (
  data: ICompanyForm,
): Promise<AxiosResponse<any>> => {
  return await axiosInstance.post<any>(endpoints.CREATE_COMPANY, data);
};

export const fetchCompanies = async (
  queryParams?: IQueryParams,
): Promise<AxiosResponse<ICompanyResponse>> => {
  return await axiosInstance.get<ICompanyResponse>(
    endpoints.FETCH_COMPANIES(queryParams),
  );
};

export const fetchReferalSource = async (): Promise<
  AxiosResponse<ISourceType[]>
> => {
  return await axiosInstance.get<ISourceType[]>(endpoints.FETCH_REFERAL_SOURCE);
};
