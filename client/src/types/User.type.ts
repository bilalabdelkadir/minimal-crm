export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  isMultiFactorAuthEnabled: boolean;
  profilePicture: string | null;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
}
