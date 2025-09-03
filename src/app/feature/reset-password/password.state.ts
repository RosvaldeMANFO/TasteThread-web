export type PasswordState = {
    token?: string;
    newPassword: string;
    confirmPassword: string;
    loading: boolean;
    message?: string;
    success?: boolean;
}