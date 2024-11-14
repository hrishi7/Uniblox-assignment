import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const productApi = {
  getAll: async() => await api.get('/products'),

};

export const cartApi = {
  addItem: async(productId: string, quantity: number, userId: string) => 
    await api.post('/cart', {
      productId, quantity, userId
    } ),

  updateItem: async (productId: string, quantity: number, userId: string) =>
    await api.put(`/cart/${productId}`, {
      quantity, userId
    } ),

  removeItem: async(productId: string, userId: string) => 
    await api.delete(`/cart/${productId}`,{data:{userId}}),

  getCart: async(userId: string) => await api.get(`/cart/${userId}`),
  
};

export const orderApi = {
  checkout: async(discountCode: string, userId: string) => await api.post('/orders/checkout', { discountCode, userId }),

  getOrders: async(userId: string) => await api.get(`/orders/${userId}`),
};

export const adminApi = {
  getStats: async() => await api.get('/admin/stats'),

  generateDiscountCode: async(discountPercentage: number) => await api.post('/admin/discount',{discountPercentage}),
};