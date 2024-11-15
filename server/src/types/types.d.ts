export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
  }
  
  export interface CartItem {
    productId: string;
    price: number;
    quantity: number;
  }
  
  export interface Cart {
    userId: string;
    items: CartItem[];
    total: number;
    discountCode?: string;
  }
  
  export interface DiscountCode {
    code: string;
    percentage: number;
    isValid: boolean;
  }
  
  export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    discountCode?: string;
    discountAmount?: number;
    finalAmount: number;
    createdAt: Date;
  }