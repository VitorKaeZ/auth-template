import fastify from "fastify"
import cors from "@fastify/cors";
import { routes } from "./routes/routes";
import { userRoutes } from "./routes/user.routes";
import "dotenv/config"
const app = fastify({logger: false})


const start = async () => {
    
    await app.register(cors)

    await app.register(routes)

    await app.register(userRoutes, {
        prefix: '/users',
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