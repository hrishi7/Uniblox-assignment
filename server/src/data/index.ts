import { Cart, DiscountCode, Order, Product } from "../types/types";

export let discountCodes: DiscountCode[] = [];
export let orders: Order[] = [];
// Mock product database
export const products: Product[] = [
    { id: '1', name: 'Laptop', price: 999.99, description: 'High-end laptop' },
    { id: '2', name: 'Phone', price: 599.99, description: 'Smartphone' },
  ];
export let carts: Cart[] = [];
export let orderCount = 0;
export let orderCountAfterDiscountApplied = 2;