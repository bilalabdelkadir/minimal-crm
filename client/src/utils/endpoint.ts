interface IQueryParams {
  page?: number;
  size?: number;
  search?: string;
  filter?: string;
}

const endpoints = {
  SIGNUP: "/auth/sign-up",
  SIGNIN: "/auth/sign-in",
  VERIFY_OTP: "/auth/verify-otp",
  REQUEST_OTP: "/auth/request-new-otp",
  CREATE_WORKSPACE: "/workspaces",
  FETCH_WORKSPACE: "/workspaces",
  CREATE_COMPANY: "/companies",
  UPDATE_COMPANY: (id: string) => `/companies/${id}`,
  FETCH_COMPANY: (id: string) => `/companies/${id}`,
  CREATE_CONTACT: "/contacts",
  FETCH_COMPANIES: (queryParams?: IQueryParams) => {
    const { page = 1, size = 20, search = "", filter = "" } = queryParams || {};
    return `/companies?page=${page}&size=${size}&search=${search}&filter=${filter}`;
  },
  FETCH_REFERAL_SOURCE: "/companies/referal-source",
};

export default endpoints;
