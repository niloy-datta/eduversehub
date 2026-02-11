import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

/**
 * Middleware to handle validation results from express-validator.
 * If there are validation errors, it sends a 400 response.
 * Otherwise, it calls the next middleware.
 */
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 'error',
      errors: errors.array(),
    });
    return;
  }
  next();
};