// Generic type for a successful API response
export type ApiSuccessResponse<T> = {
  data: T;
  success: true;
};

// Generic type for a failed API response
export type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    traceId?: string;
  };
  success: false;
};

// A generic API response can be either a success or an error
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
