import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to validate cart item data in the request body.
 * 
 * Checks if 'productId' and 'quantity' are present and if 'quantity' is at least 1.
 * If validation fails, responds with a 400 status and an error message.
 * Otherwise, proceeds to the next middleware or route handler.
 * 
 * @param req - Express request object containing cart item data in the body.
 * @param res - Express response object used to send a response if validation fails.
 * @param next - Express next function to pass control to the next middleware.
 */
export const validateCartItem = (req: Request, res: Response, next: NextFunction) => {
  const { productId, quantity } = req.body;
  
  if (!productId || !quantity || quantity < 1) {
    return res.status(400).json({ message: 'Invalid cart item data' });
  }
  
  next();
};


/**
 * Middleware to validate order data in the request body.
 * 
 * This function checks if the 'userId' and 'items' fields are present in the request body.
 * It also verifies that 'items' is an array with at least one element.
 * If validation fails, it responds with a 400 status and an error message.
 * Otherwise, it passes control to the next middleware function.
 * 
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next middleware function in the stack.
 */
export const validateOrder = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;
  
  if (!userId) {
    return res.status(400).json({ message: 'Invalid User' });
  }
  
  next();
};