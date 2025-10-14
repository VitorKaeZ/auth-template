import { createHttpServer } from "./presentation/http/server";


const start = async () => {
    const httpServer = createHttpServer()
    

    try {
        await httpServer.listen({ port: Number(process.env.PORT), host: "0.0.0.0" })
        
        console.log(`Server is running! http://localhost:${process.env.PORT}/`)
        console.log(`Swagger docs are available at http://localhost:${process.env.PORT}/docs`)
      
    } catch (error) {
        httpServer.log.error(error)
        process.exit(1)
    }
}


start()