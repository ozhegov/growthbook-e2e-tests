export interface Organization {
  id: string;
  name: string;
}

export interface UserApiResponse {
  status: number;
  userId: string;
  userName: string;
  email: string;
  pylonHmacHash: string;
  superAdmin: boolean;
  organizations: Organization[];
}
