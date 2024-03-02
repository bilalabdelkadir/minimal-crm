export interface IWorkspaceResponse {
  id: string;
  name: string;
  description?: string;
  logoId?: string;
  website?: string;
  country?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  createdById: string;
  ownedById: string;
  logo?: {
    id: string;
    url: string;
  };
  _count: {
    users: number;
  };
  createdBy: {
    id: string;
    firstName: string;
  };
}
