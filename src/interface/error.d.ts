class AppError extends Error {
  statusCode: number;

  status: "success" | "error" | "fail";

  isOperational: boolean;

  code: number | undefined;

  _message: string | undefined;

  errors: { message: string }[] | undefined;

  path: string | undefined;

  value: string | undefined;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
