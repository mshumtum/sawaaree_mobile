export interface LoginWithEmailRequest {
  email: string;
  password: string;
}

export interface LoginWithPhoneRequest {
  phone: string;
}

export interface VerifyPhoneOtpRequest {
  phone: string;
  otp: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

export interface OtpRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface LoginResponse {
  token: string;
  user: UserData;
}

export interface UserData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  token: string;
  user: {
    phone?: string;
  };
} 