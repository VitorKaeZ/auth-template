import fastify from "fastify"
import { createHttpServer } from "./presentation/http/server";


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