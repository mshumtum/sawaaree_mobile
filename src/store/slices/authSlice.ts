import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiClient from '../../services/ApiClient';
import {API_ENDPOINTS} from '../../services/endpoints';
import StorageService from '../../services/StorageService';
import NavigationService from '../../navigation/NavigationService';
import type {
  LoginRequest,
  RegisterRequest,
  OtpRequest,
  AuthResponse,
  ApiResponse,
  PhoneLoginRequest,
  VerifyPhoneOtpRequest,
  LoginResponse,
  LoginWithEmailRequest,
  LoginWithPhoneRequest,
} from '../../types/api.types';

interface AuthState {
  user: AuthResponse['user'] | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post<ApiResponse<AuthResponse>>(
        API_ENDPOINTS.AUTH.LOGIN_WITH_EMAIL,
        credentials,
      );
      await StorageService.setItem('token', response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: Omit<RegisterRequest, 'role'>, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post<ApiResponse<AuthResponse>>(
        API_ENDPOINTS.AUTH.REGISTER,
        {
          ...userData,
          role: 'user',
        },
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (data: OtpRequest, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post<ApiResponse<AuthResponse>>(
        API_ENDPOINTS.AUTH.VERIFY_OTP,
        data,
      );
      await StorageService.setItem('token', response.data.token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const loginWithEmail = createAsyncThunk(
  'auth/loginWithEmail',
  async (credentials: LoginWithEmailRequest, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post<ApiResponse<AuthResponse>>(
        API_ENDPOINTS.AUTH.LOGIN_WITH_EMAIL,
        credentials,
      );
      if (response.data.token) {
        await StorageService.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  },
);

export const loginWithPhone = createAsyncThunk(
  'auth/loginWithPhone',
  async (data: LoginWithPhoneRequest, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post<ApiResponse<{message: string}>>(
        API_ENDPOINTS.AUTH.LOGIN_WITH_PHONE,
        data,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to send OTP');
    }
  },
);

export const verifyPhoneOtp = createAsyncThunk(
  'auth/verifyPhoneOtp',
  async (data: VerifyPhoneOtpRequest, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post<ApiResponse<AuthResponse>>(
        API_ENDPOINTS.AUTH.VERIFY_PHONE_OTP,
        data,
      );
      console.log("response>>>", response);
      if (response.token) {
        await StorageService.setItem('token', response.token);
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'OTP verification failed');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      StorageService.removeItem('token');
      NavigationService.reset('Login');
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Login
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        NavigationService.reset('Home');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, state => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Verify OTP
    builder
      .addCase(verifyOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        NavigationService.reset('Home');
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Email Login
    builder
      .addCase(loginWithEmail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        NavigationService.reset('Home');
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Phone Login (Send OTP)
    builder
      .addCase(loginWithPhone.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithPhone.fulfilled, state => {
        state.loading = false;
      })
      .addCase(loginWithPhone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Verify Phone OTP
    builder
      .addCase(verifyPhoneOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPhoneOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        NavigationService.reset('Home');
      })
      .addCase(verifyPhoneOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {logout, clearError} = authSlice.actions;
export default authSlice.reducer; 