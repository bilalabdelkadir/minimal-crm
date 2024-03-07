export interface IQueryParams {
  page?: number;
  size?: number;
  search?: string;
  filter?: string;
}

export interface ISourceType {
  id: string;
  name: string;
  srouceType: "ReferalSource" | "LeadSource" | "CompaignSource";
}
