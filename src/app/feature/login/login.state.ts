export type AuthenticationState = {
  credential: {
    email: string;
    password: string;
  };
  rememberMe: boolean;
  loading: boolean;
  message?: string;
  success?: boolean;
};