import fastify from "fastify"
import cors from "@fastify/cors";
import { routes } from "./routes";
const app = fastify({logger: false})


const start = async () => {
    
    await app.register(cors)
    await app.register(routes)


    try {
        await app.listen({ port: 3333 }).then(() =>{
            console.log("Server is running!")
        })
    } catch (error) {
        process.exit(1)
    }
}


start()