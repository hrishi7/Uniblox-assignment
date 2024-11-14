import { Request, Response } from 'express';
import { Order, Cart, DiscountCode } from '../types/types';

import { carts, orders, discountCodes, orderCountAfterDiscountApplied } from '../data';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, discountCode } = req.body;

    const orderCount = orders.length + 1;

     // Find user's cart
     const cart = carts.find(c => c.userId === userId);
     if (!cart || cart.items.length === 0) {
       return res.status(400).json({ message: 'Cart is empty' });
     }

    let discountAmount = 0;

    if(discountCode){
      // check for valid code
      const validDiscount = discountCodes.find(
        d => d.code === discountCode && d.isValid
      );
      if (!validDiscount) {
        return res.status(400).json({ message: 'Invalid discount code' });
      }
      const isNthOrder = orderCount % orderCountAfterDiscountApplied === 0;
      if(!isNthOrder){
        return res.status(400).json({message: 'this order does not eligible for discount'})
      }

      // calculate the discount 
      discountAmount = (cart.total * validDiscount.percentage) / 100;
    }
    
   
    const order: Partial<Order> = {
      id: `ORDER-${Date.now()}`,
      userId,
      items: [...cart.items],
      total: cart.total,
      createdAt: new Date()
    };

    if(discountAmount > 0){
      // update isValid to false for the used discount code
      const validDiscountIndex = discountCodes.findIndex(
        d => d.code === discountCode && d.isValid
      );
      if (validDiscountIndex !== -1) {
        discountCodes[validDiscountIndex].isValid = false;
      }
      order.discountCode = discountCode;
      order.discountAmount = discountAmount;
      order.finalAmount = cart.total - discountAmount;
    }

    orders.push(order as Order);

    // Clear the cart after successful order
    cart.items = [];
    cart.total = 0;

    res.status(201).json({order});
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
};

/**
 * Retrieves all orders for a specific user.
 * 
 * @param req - The request object containing the user ID in the parameters.
 * @param res - The response object used to send back the orders or error messages.
 */
export const getOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userOrders = orders.filter((order: Order) => order.userId === userId);
    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders' });
  }
};