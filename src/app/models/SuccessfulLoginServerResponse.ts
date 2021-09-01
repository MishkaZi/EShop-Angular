export interface SuccessfulLoginServerResponse {
  token: string;
  isAdmin: boolean;
  usersDetails: { id: number; firstName: string };
}
