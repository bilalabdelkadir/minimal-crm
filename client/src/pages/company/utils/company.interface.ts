import { z } from "zod";
import { companySchema } from "./company.schema";
import { UseFormReturnType } from "@mantine/form";

export interface ICompanyResponse {
  data: ICompany[];
  meta: IMeta;
}

export interface IMeta {
  page: number;
  size: number;
  total: number;
  totalPages: number;
}

export interface ICompany {
  id: string;
  name: string;
  email: string;
  secondaryEmail?: string;
  workspaceId: string;
  phone?: string;
  secondaryPhone?: string;
  website?: string;
  preferredContactMethod?: string;
  //   TODO: update this to include logo
  //   logoId: null;
  tags?: [
    {
      id: string;
      name: string;
    },
  ];
  referalSource?: [
    {
      id: string;
      name: string;
    },
  ];
  preferredCurrency?: string;
  preferredLanguage?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  isDeleted: boolean;
}
export interface IFormProps<T> {
  form: UseFormReturnType<T>;
}

export type ICompanyForm = z.infer<typeof companySchema>;
