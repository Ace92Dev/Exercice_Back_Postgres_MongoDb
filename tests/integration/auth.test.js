jest.mock('../../src/models/pgUserModel', () => ({
  findByUsername: async (username) => {
    if (username === 'john') {
      const bcrypt = require('bcrypt');
      const hash = await bcrypt.hash('password123', 1);
      return { id: 1, username: 'john', password: hash, role: 'user' };
    }
    return null;
  },
  create: async ({ username, password, role }) => ({ id: 2, username, role: role || 'user', password }),
}));

process.env.JWT_SECRET = 'testsecret';

const request = require('supertest');
const app = require('../../src/app');

describe('Auth integration', () => {
  it('rejects invalid credentials', async () => {
    await request(app)
      .post('/auth/login')
      .send({ username: 'john', password: 'wrong' })
      .expect(401);
  });

  it('accepts valid login', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'john', password: 'password123' })
      .expect(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeTruthy();
  });
});

