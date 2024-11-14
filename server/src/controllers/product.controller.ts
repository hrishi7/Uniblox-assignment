import { Request, Response } from 'express';
import { Product } from '../types/types';
import { products } from '../data';

export const getProducts = async (req: Request, res: Response) => {
  try {
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products' });
  }
};