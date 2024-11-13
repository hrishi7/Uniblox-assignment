import request from 'supertest';
import app,{server} from '../server';
import { describe, test, expect, afterAll } from '@jest/globals';

describe('Order API', () => {
  const testUserId = '123';

  test('should create order', async () => {
    // First add items to cart
    await request(app)
      .post('/api/cart')
      .send({
        userId: testUserId,
        productId: '1',
        quantity: 2
      });

    // Then checkout
    const response = await request(app)
      .post('/api/orders/checkout')
      .send({
        userId: testUserId
      });

    expect(response.status).toBe(201);
    expect(response.body.userId).toBe(testUserId);
    expect(response.body.finalAmount).toBeGreaterThan(0);
  });

   // Close the server after all tests
   afterAll(done => {
    server.close(done);
  });
});