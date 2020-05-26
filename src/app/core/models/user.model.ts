export interface User {
  id?: number;
  username: string;
  password?: string;
  email: string;
  mobileNumber?: string;
  admin: boolean;
  confirmed: boolean;
}
