import { UseQueryResult, useMutation, useQuery } from "react-query";
import { AxiosError } from "axios";
import {
  createCompany,
  fetchCompanies,
  fetchReferalSource,
} from "@/service/api/company.api";
import { IQueryParams, ISourceType } from "@/types/Query.type";
import { ICompanyResponse } from "../utils/company.interface";

export const createCompanyMutation = (
  onError?: (error: AxiosError | any) => void,
  onSuccess?: (data: any) => void,
) => {
  return useMutation({ mutationFn: createCompany, onSuccess, onError });
};

export const fetchCompaniesQuery = (
  queryParams?: IQueryParams,
  onError?: (error: AxiosError | any) => void,
  onSuccess?: (data: ICompanyResponse) => void,
): UseQueryResult<ICompanyResponse> => {
  return useQuery({
    queryKey: ["fetchCompanies", queryParams],
    queryFn: () => fetchCompanies(queryParams),
    onError,
    onSuccess,
  });
};

export const fetchReferalSourceQuery = (
  onError?: (error: AxiosError | any) => void,
  onSuccess?: (data: any) => void,
): UseQueryResult<ISourceType[]> => {
  return useQuery({
    queryKey: "fetchReferalSource",
    queryFn: () => fetchReferalSource(),
    onError,
    onSuccess,
  });
};
