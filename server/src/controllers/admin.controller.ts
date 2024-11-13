import { Request, Response } from 'express';
import { DiscountCode } from '../types/types';

import { discountCodes, orders } from '../data';


export const generateDiscountCode = async (req: Request, res: Response) => {
  try {
    const code: DiscountCode = {
      code: `DISCOUNT-${Date.now()}`,
      percentage: req.body.discountPercentage ?? 10,
      isValid: true
    };
    
    discountCodes.push(code);
    res.status(201).json(code);
  } catch (error) {
    res.status(500).json({ message: 'Error generating discount code' });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const totalOrders = orders.length;
    const totalAmount = orders.reduce((sum, order) => sum + order.total, 0);
    const totalDiscountAmount = orders.reduce(
      (sum, order) => sum + (order.discountAmount || 0),
      0
    );

    const stats = {
      totalOrders,
      totalAmount,
      totalDiscountAmount,
      discountCodes: discountCodes,
      averageOrderValue: totalAmount / totalOrders || 0,
      totalDiscountCodesIssued: discountCodes.length,
      activeDiscountCodes: discountCodes.filter(code => code.isValid).length
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics' });
  }
};