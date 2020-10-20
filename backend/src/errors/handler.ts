import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  return res.status(500).json({
    status: false,
    message: "Ocorreu um erro interno",
  });
};

export default errorHandler;
