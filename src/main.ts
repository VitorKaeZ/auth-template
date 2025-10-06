import fastify from "fastify"
import { routes } from "./infrastructure/main/routes/routes";
import { userRoutes } from "./infrastructure/main/routes/user.routes";
import fastifyOauth2, { FastifyOAuth2Options } from '@fastify/oauth2';
import { oAuthRoutes } from "./infrastructure/main/routes/oAuth.routes";
import { createHttpServer } from "./infrastructure/main/http/server";


const app = fastify({ logger: false })

// Configuração do Google OAuth


const start = async () => {
    const httpServer = createHttpServer()
    

    try {
        await httpServer.listen({ port: Number(process.env.PORT), host: "0.0.0.0" })
        
        console.log(`Server is running! http://localhost:${process.env.PORT}/`)
      
    } catch (error) {
        process.exit(1)
    }
}


start()