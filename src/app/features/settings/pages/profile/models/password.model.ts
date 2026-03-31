export interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordRule {
  label: string;
  valid: boolean;
  test: (pw: string) => boolean;
}
