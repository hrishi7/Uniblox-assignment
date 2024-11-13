import { Request, Response } from 'express';

import { carts, products } from '../data';

/**
 * Adds a product to the user's cart.
 *
 * This function handles the addition of a specified product to the cart
 * of a user identified by userId. If the product does not exist, it
 * returns a 400 error. If the user's cart does not exist, it creates a
 * new cart. If the product is already in the cart, it updates the quantity.
 * The cart's total is recalculated after the addition.
 *
 * @param req - The request object containing userId, productId, and quantity in the body.
 * @param res - The response object used to send back the cart or error message.
 */
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;
    
    const product = products.find(p => p.id === productId);
    if (!product) {
      return res.status(400).json({ message: 'Product not found' });
    }

    let cart = carts.find(c => c.userId === userId);
    if (!cart) {
      cart = { userId, items: [], total: 0 };
      carts.push(cart);
    }

    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const product = products.find(p => p.id === productId);
      cart.items.push({ productId, quantity, price: product?.price || 0 });
    }

    // Recalculate total
    cart.total = cart.items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart' });
  }
};

/**
 * Retrieves the cart for a specific user.
 *
 * @param req - The request object containing the user ID in the parameters.
 * @param res - The response object used to send back the cart or error messages.
 */
export const getCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const cart = carts.find(c => c.userId === userId);
    
    if (!cart) {
      return res.status(400).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cart' });
  }
};

/**
 * Updates the quantity of a specific item in the user's cart.
 *
 * @param req - The request object containing the user ID in the body and item ID in the parameters.
 * @param res - The response object used to send back the updated cart or error messages.
 *
 * @returns A JSON response with the updated cart or an error message if the cart or item is not found.
 *
 * @throws Returns a 500 status code with an error message if an unexpected error occurs during the update process.
 */
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;
    const { userId, quantity } = req.body;

    const cart = carts.find(c => c.userId === userId);
    if (!cart) {
      return res.status(400).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.productId === itemId);
    if (!item) {
      return res.status(400).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;
    
    // Recalculate total
    cart.total = cart.items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item' });
  }
};

/**
 * Removes a specific item from the user's cart.
 *
 * @param req - The request object containing the item ID in the parameters and user ID in the body.
 * @param res - The response object used to send back the updated cart or error messages.
 */
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;
    const { userId } = req.body;

    const cart = carts.find(c => c.userId === userId);
    if (!cart) {
      return res.status(400).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId !== itemId);
    
    // Recalculate total
    cart.total = cart.items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart' });
  }
};