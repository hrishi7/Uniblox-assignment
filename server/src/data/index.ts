import { Cart, DiscountCode, Order, Product } from "../types/types";

export let discountCodes: DiscountCode[] = [];
export let orders: Order[] = [];
// Mock product database
export const products: Product[] =[
  { id: '1', name: 'Laptop', price: 999.99, description: 'High-end laptop', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D' },
  { id: '2', name: 'Phone', price: 599.99, description: 'Smartphone', image: 'https://www.lovemerchandise.co.uk/images/module_images/shop/love_merchandise_eco_sustainable.jpg' },
]
export let carts: Cart[] = [];
export let orderCount = 0;
export let orderCountAfterDiscountApplied = 2;