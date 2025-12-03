import { config } from "dotenv";
config()
import Fastify, { fastify } from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

import userModule from "./modules/users/user.index.js";
import db from "./plugins/db.js";
import authPlugin from "./plugins/auth.plugin.js";
import siteModule from "./modules/sites/site.index.js";
import { startBotPolling } from "./utilities/bot/botPolling.js";

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

app.register(swagger, {
    openapi: {
        info: {
            title: "Monitoring API",
            version: "1.0.0",
            description: "API for Monitoring Application"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer"
                }
            }
        }
    }
});

app.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
        docExpansion: "list",
        deepLinking: false
    }
});

app.register(db);
app.register(authPlugin);
app.get("/hello", async () => {
    return {message: "Hello Dana Junior!"};
});

app.register(userModule, {prefix: "/api/v1/users"});
app.register(siteModule, {prefix: "/api/v1/sites"});

async function start() {
    try {
        // Bot Polling
        startBotPolling();

        // Server Listen
        await app.listen({port: 3000});

        console.log(`\u2705 server running on ${process.env.BASE_URL}`);

    }catch(error){
        app.log.error(error);
        process.exit(1);
    }
}

start();