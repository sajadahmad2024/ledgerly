import { ApiErrorResponse } from '@/types/api';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export class ApiError extends Error {
  statusCode: number;
  errorType: string;

  constructor(statusCode: number, message: string, errorType: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
  }
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data: unknown = await response.json();

  if (!response.ok || !(data as { success?: boolean }).success) {
    const errorPayload = data as ApiErrorResponse;
    const message = Array.isArray(errorPayload.error?.message)
      ? errorPayload.error.message.join(', ')
      : errorPayload.error?.message || 'An error occurred';

    throw new ApiError(
      response.status,
      message,
      errorPayload.error?.error || 'HTTP_ERROR',
    );
  }

  return (data as { data: T }).data;
}
