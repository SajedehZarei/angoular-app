export interface TwoFactorLoginDepartmentr {
  usernameOrPhoneNumber: string;
  password: string;
}

export interface VerifyTwoFactorLoginCode {
  code: string;
  username: string;
}

export interface VerifyResetPasswordVerificationCode {
  usernameOrPhoneNumber: string;
  verificationCode: string;
}

export interface ResetPassword {
  usernameOrPhoneNumber: string;
  newPassword: string;
}

export interface SendResetPasswordVerificationCode {
  UsernameOrPhoneNumber: string;
}

export interface getNewToken {
  accessToken: string;
  refreshToken: string;
}
