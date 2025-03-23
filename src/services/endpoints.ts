export const API_ENDPOINTS = {
  AUTH: {
    LOGIN_WITH_EMAIL: 'users/loginWithEmail',
    LOGIN_WITH_PHONE: 'users/sendOtpForLogin',
    VERIFY_PHONE_OTP: 'users/verifyOtp',
    REGISTER: 'users/register',
    VERIFY_OTP: 'users/verify-otp',
    FORGOT_PASSWORD: 'users/forgot-password',
    RESET_PASSWORD: 'users/reset-password',
  },
  USER: {
    PROFILE: 'user/profile',
    UPDATE_PROFILE: 'user/update',
  },
  BOOKING: {
    GET_NEARBY_LOCATIONS: 'users/getNearbyLocations',
  },
  // Add other endpoints as needed
}; 