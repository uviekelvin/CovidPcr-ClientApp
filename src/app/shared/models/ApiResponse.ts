export class ApiResponse<T> {
  message: string;
  data: T;
  totalCount: number;
}
