import type { UserRole } from './user-role';

export interface User {
  role?: UserRole;
  email: string;
  password: string;
  name: string;
}
