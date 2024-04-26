import AppError from "./error";

export type htmlFormMethod = "get" | "post" | "put" | "patch" | "delete" | "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type backendStatusText = "success" | "error" | "fail";
export type appRole = "admin" | "user";

export interface BaseDocument {
  _id: string;
  id: string;
  autoId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseModel {
  _id?: string;
  id?: string;
  autoId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ResponseBody {
  results?: number;
  status: backendStatusText;
  message?: string;
  error?: AppError;
}
