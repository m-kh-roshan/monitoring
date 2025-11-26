import Fastify, { fastify } from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

const app = Fastify({
    logger: {
        transport: {
            target: "pino-pretty",
            options: {
                colorize: true,
                singleLine: true,
                mesageFormat: "{msg}",
                ignore: "pid,hostname"
            }
        },
        serializers: {
            req(request){
                return {
                    method: request.method,
                    host: request.hostname,
                    url: request.url
                };
            },
            res(reply){
                return {
                    statusCode: reply.statusCode
                };
            }
        }
    }
}).withTypeProvider<TypeBoxTypeProvider>();

app.get("/hello", async () => {
    return {message: "Hello Dana Junior!"};
});

async function start() {
    try {
        await app.listen({port: 3000});
        console.log("server running on http://localhost:3000");
    }catch(error){
        app.log.error(error);
        process.exit(1);
    }
}

start()