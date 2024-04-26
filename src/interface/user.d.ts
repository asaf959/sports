import { BaseDocument } from ".";

export interface User extends BaseDocument {
  name: string;
  email: string;
  isVerified: boolean;
  role: appRole;
}

