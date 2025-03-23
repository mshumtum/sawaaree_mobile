import axios, {AxiosInstance, AxiosResponse} from 'axios';
import StorageService from './StorageService';

const BASE_URL = 'https://6794-49-43-128-131.ngrok-free.app/api/';

class ApiClient {
  private static instance: ApiClient;
  public api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 seconds timeout
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      async config => {
        const token = await StorageService.getItem('token');
        if (token) {
          config.headers.Authorization = `${token}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async error => {
        // Handle global errors
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          await StorageService.removeItem('token');
        }

        return Promise.reject(error);
      },
    );
  }

  // Helper method for error handling
  private static handleError(error: any): never {
    const message = error.response?.data?.message || 'Something went wrong';
    throw new Error(message);
  }

  // Generic request methods
  public async get<T>(url: string, params?: object): Promise<T> {
    try {
      const response = await this.api.get<T>(url, {params});
      return response.data;
    } catch (error) {
      return ApiClient.handleError(error);
    }
  }

  public async post<T>(url: string, data?: object): Promise<T> {
    try {
      console.log('url', url);
      console.log('data', data);

      
      const response = await this.api.post<T>(url, data);      
      return response.data;
    } catch (error) {
      console.log("error>>>", error);
      return ApiClient.handleError(error);
    }
  }

  public async put<T>(url: string, data?: object): Promise<T> {
    try {
      const response = await this.api.put<T>(url, data);
      return response.data;
    } catch (error) {
      return ApiClient.handleError(error);
    }
  }

  public async delete<T>(url: string): Promise<T> {
    try {
      const response = await this.api.delete<T>(url);
      return response.data;
    } catch (error) {
      return ApiClient.handleError(error);
    }
  }
}

export default ApiClient.getInstance(); 