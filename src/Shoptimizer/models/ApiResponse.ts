import { HttpStatusCode } from "axios";

interface ApiResponse<T, D = T> {
  request: any;
  success: boolean;
  data: T;
  statusCode: HttpStatusCode;
  message: string;
}

export default ApiResponse;