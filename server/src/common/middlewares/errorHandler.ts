import { Request, Response } from "express";

function errorHandler(err: any, req: Request, res: Response, next: any) {
  const status = err.status || 500;
  const message = typeof err.message === "string" ? err.message : "Noting";
  const stack = err.stack;

  res.status(status ? status : 500).json({
    message: message,
    stack: stack,
  });
}

export default errorHandler;
