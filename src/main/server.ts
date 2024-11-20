import fastify from "fastify"
import cors from "@fastify/cors";
import { routes } from "./routes/routes";
import { userRoutes } from "./routes/user.routes";
import "dotenv/config"
import fastifyOauth2, { FastifyOAuth2Options } from '@fastify/oauth2';
import { oAuthRoutes } from "./routes/oAuth.routes";


const app = fastify({logger: false})

// Configuração do Google OAuth
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
  

const start = async () => {
    
    await app.register(cors)

    await app.register(routes)
    
    await app.register(userRoutes, {
        prefix: '/users',
    })
    
    await app.register(fastifyOauth2, googleOAuth2Options)
    
    await app.register(oAuthRoutes, {
        prefix: '/auth',
    })

    try {
        await app.listen({ port: Number(process.env.PORT) }).then(() =>{
            console.log(`Server is running! http://localhost:${process.env.PORT}/`)
        })
    } catch (error) {
        process.exit(1)
    }
}


start()