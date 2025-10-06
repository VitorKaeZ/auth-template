import { FastifyRequest, FastifyReply } from 'fastify';
import { verify } from 'jsonwebtoken';
import 'dotenv/config';

// Extend the FastifyRequest interface to include the user property
declare module 'fastify' {
  interface FastifyRequest {
    user?: { id: string; roles: string[] };
  }
}

export default function authenticateJwt(requiredRole?: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const authorization = request.headers.authorization;

    if (!authorization) {
      return reply.code(401).send({ error: 'Token is missing!' });
    }

    // Robust token extraction
    let token: string;
    if (authorization.startsWith('Bearer ')) {
      token = authorization.substring(7);
    } else {
      token = authorization;
    }

    if (!token) {
        return reply.code(401).send({ error: "Token is malformed!" });
    }

    try {
      const secret = process.env.JWT_TOKEN;

      if (!secret) {
        throw new Error('JWT secret is not defined');
      }

      const decodedToken = verify(token, secret) as { userId: string; roles: string[] };

      if (requiredRole && !decodedToken.roles.includes(requiredRole)) {
        return reply.code(403).send({ error: 'Forbidden: Insufficient permissions' });
      }

      request.user = { id: decodedToken.userId, roles: decodedToken.roles };

    } catch (error) {
      return reply.code(401).send({ error: 'Invalid token!', details: error.message });
    }
  };
}
