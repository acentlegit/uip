import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import routes from "./routes";

export function createServer(openapiPath: string) {
  const app = Fastify({ logger: true });

  app.register(swagger, {
    mode: "static",
    specification: { path: openapiPath }
  });

  app.register(swaggerUI, { routePrefix: "/docs" });
  app.register(routes);

  return app;
}