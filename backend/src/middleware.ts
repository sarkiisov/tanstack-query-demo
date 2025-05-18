import { Request, Response, NextFunction } from "express";
import { UserSchema } from "./types";
import { ZodError } from "zod";

export const validateUserMiddleware =
  () => (req: Request, res: Response, next: NextFunction) => {
    try {
      UserSchema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: "error",
          errors: error.errors.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        });
        return;
      }
      next(error);
    }
  };

export const delayMiddleware =
  (delay: number) => (req: Request, res: Response, next: NextFunction) => {
    setTimeout(next, delay);
  };
