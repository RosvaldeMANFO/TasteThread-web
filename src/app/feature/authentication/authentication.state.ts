export type AuthenticationState = {
  user: {
    email: string;
    password: string;
  };
  rememberMe: boolean;
  loading: boolean;
};