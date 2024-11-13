import request from 'supertest';
import app ,{server} from '../server';
import { describe, test, expect, afterAll } from '@jest/globals';

describe('Admin API', () => {
  test('should generate discount code', async () => {
    const response = await request(app)
      .post('/api/admin/discount');

    expect(response.status).toBe(201);
    expect(response.body.code).toBeDefined();
    expect(response.body.percentage).toBe(10);
  });

  test('should get statistics', async () => {
    const response = await request(app)
      .get('/api/admin/stats');

    expect(response.status).toBe(200);
    expect(response.body.totalOrders).toBeDefined();
    expect(response.body.totalAmount).toBeDefined();
    expect(response.body.discountCodes).toBeDefined();
  });

   // Close the server after all tests
   afterAll(done => {
    server.close(done);
  });
});