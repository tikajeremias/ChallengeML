import request from 'supertest';
import app from '../../app';

describe('GET /api/items', () => {

  it('should return items with 200 status', async () => {
    const response = await request(app).get('/api/items?q=laptop');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('author');
    expect(response.body).toHaveProperty('items');
    expect(response.body.items.length).toBeGreaterThan(0);
  });

  it('should return 500 if the API fails', async () => {
    const response = await request(app).get('/api/items?q=INVALID-INVALID-INVALID');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
  
});

describe('GET /api/items/MLA1753463402', () => {

  it('should return items with 200 status', async () => {
    const response = await request(app).get('/api/items/MLA1753463402');
    expect(response.status).toBe(200);
    expect(response.text).toBeDefined();
  });

  it('should return 500 if the API fails', async () => {
    const response = await request(app).get('/api/items/INVALID-INVALID-INVALID');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
  
});