import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import authenticateJwt from './auth-middleware';

// Mocking environment variables
process.env.JWT_TOKEN = 'your-secret-key';

describe('authenticateJwt Middleware', () => {
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;
  let code: jest.Mock;
  let send: jest.Mock;

  beforeEach(() => {
    send = jest.fn();
    code = jest.fn(() => ({ send }));
    mockRequest = {
      headers: {},
    };
    mockReply = {
      code,
      send,
    };
  });

  // Helper to create a token
  const createToken = (payload: object) => {
    return jwt.sign(payload, process.env.JWT_TOKEN || '');
  };

  it('should return 401 if token is missing', async () => {
    const middleware = authenticateJwt();
    await middleware(mockRequest as FastifyRequest, mockReply as FastifyReply);
    expect(mockReply.code).toHaveBeenCalledWith(401);
    expect(send).toHaveBeenCalledWith({ error: 'Token is missing!' });
  });

  it('should return 401 if token is invalid', async () => {
    mockRequest.headers = { authorization: 'Bearer invalidtoken' };
    const middleware = authenticateJwt();
    await middleware(mockRequest as FastifyRequest, mockReply as FastifyReply);
    expect(mockReply.code).toHaveBeenCalledWith(401);
    expect(send).toHaveBeenCalledWith({ error: 'Invalid token!' });
  });

  it('should pass if token is valid and no role is required', async () => {
    const token = createToken({ userId: '123', roles: ['USER'] });
    mockRequest.headers = { authorization: `Bearer ${token}` };
    const middleware = authenticateJwt();
    await middleware(mockRequest as FastifyRequest, mockReply as FastifyReply);
    expect(mockReply.code).not.toHaveBeenCalled();
    expect(mockRequest.user).toEqual({ id: '123', roles: ['USER'] });
  });

  it('should pass if user has the required role', async () => {
    const token = createToken({ userId: '123', roles: ['ADMIN'] });
    mockRequest.headers = { authorization: `Bearer ${token}` };
    const middleware = authenticateJwt('ADMIN');
    await middleware(mockRequest as FastifyRequest, mockReply as FastifyReply);
    expect(mockReply.code).not.toHaveBeenCalled();
    expect(mockRequest.user).toEqual({ id: '123', roles: ['ADMIN'] });
  });

  it('should return 403 if user does not have the required role', async () => {
    const token = createToken({ userId: '123', roles: ['USER'] });
    mockRequest.headers = { authorization: `Bearer ${token}` };
    const middleware = authenticateJwt('ADMIN');
    await middleware(mockRequest as FastifyRequest, mockReply as FastifyReply);
    expect(mockReply.code).toHaveBeenCalledWith(403);
    expect(send).toHaveBeenCalledWith({ error: 'Forbidden: Insufficient permissions' });
  });

  it('should pass if user has multiple roles, one of which is the required role', async () => {
    const token = createToken({ userId: '123', roles: ['USER', 'ADMIN'] });
    mockRequest.headers = { authorization: `Bearer ${token}` };
    const middleware = authenticateJwt('ADMIN');
    await middleware(mockRequest as FastifyRequest, mockReply as FastifyReply);
    expect(mockReply.code).not.toHaveBeenCalled();
    expect(mockRequest.user).toEqual({ id: '123', roles: ['USER', 'ADMIN'] });
  });
});
