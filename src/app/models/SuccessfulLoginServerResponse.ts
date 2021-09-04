export interface SuccessfulLoginServerResponse {
  token: string;
  isAdmin: boolean;
  userDetails: { id: number; firstName: string };
}
