
import fastifyOauth2, { FastifyOAuth2Options } from '@fastify/oauth2';
import fastify, { FastifyInstance } from 'fastify';
import { routes } from '../routes/routes';
import { userRoutes } from '../routes/user.routes';
import { oAuthRoutes } from '../routes/oAuth.routes';
import cors from "@fastify/cors";
import { adminRoutes } from '../routes/admin.routes';



const googleOAuth2Options: FastifyOAuth2Options = {
    name: 'googleOAuth2',
    credentials: {
        client: {
            id: process.env.GOOGLE_CLIENT_ID || 'SEU_CLIENT_ID',
            secret: process.env.GOOGLE_SECRET_ID || 'SEU_CLIENT_SECRET',
        },
        auth: fastifyOauth2.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: '/auth/google',
    callbackUri: `http://localhost:${process.env.PORT}/auth/google/callback`, // URL de redirecionamento
    scope: ['openid', 'profile', 'email'], // Adicione os escopos necessários
};


export function createHttpServer(): FastifyInstance {
    const server = fastify()


     const corsOptions = {
        origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : '*',
     }

     server.register(cors, corsOptions)

     server.register(import('@fastify/rate-limit'), {
        max: 100,
        timeWindow: '15 minutes'
      })

     server.register(routes)

     server.register(adminRoutes, {
        prefix: '/admin',
    })
    
     server.register(userRoutes, {
        prefix: '/users',
    })

     server.register(fastifyOauth2, googleOAuth2Options)

     server.register(oAuthRoutes, {
        prefix: '/auth',
    })
    
    return server
}