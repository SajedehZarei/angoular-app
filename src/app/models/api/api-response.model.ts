export interface ApiResponse<T> {
  status: boolean;
  data: T;
  total?: number;
  message?: string[];
}
