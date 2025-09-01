export type AuthenticationState = {
  user: {
    email: string;
    password: string;
  };
  tokens?: {
    access: string;
    refresh: string;
  };
  loading: boolean;
  next: string | null;
  error: string | null;
};