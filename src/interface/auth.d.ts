export interface EmailInterface {
  email: string;
}
export interface PasswordInterface {
  password: string;
}
export interface PasswordConfirmInterface {
  passwordConfirm: string;
}

export interface ForgotPasswordInterface extends EmailInterface{}
export interface LoginInterface extends EmailInterface, PasswordInterface {}
export interface SignupInterface extends LoginInterface, PasswordConfirmInterface {}
export interface ResetPasswordInterface extends PasswordInterface, PasswordConfirmInterface {}

interface SportData {
  sport: string;
  league: string;
  date: string;
}
