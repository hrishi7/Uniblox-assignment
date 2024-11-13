import request from 'supertest';
import app, {server} from '../server';
import { describe, test, expect, afterAll } from '@jest/globals';

describe('Cart API', () => {
  const testUserId = '123';
  const testProductId = '1';

  test('should add item to cart', async () => {
    const response = await request(app)
      .post('/api/cart')
      .send({
        userId: testUserId,
        productId: testProductId,
        quantity: 2
      });

    expect(response.status).toBe(201);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.userId).toBe(testUserId);
  });

  test('should get cart', async () => {
    const response = await request(app)
      .get(`/api/cart/${testUserId}`);

    expect(response.status).toBe(200);
    expect(response.body.userId).toBe(testUserId);
  });

   // Close the server after all tests
   afterAll(done => {
    server.close(done);
  });
});