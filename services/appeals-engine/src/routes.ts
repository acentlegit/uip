import { FastifyInstance } from "fastify";
import { execute } from "./handler";

export default async function routes(app: FastifyInstance) {
  app.post("/v1/execute", async (req) => execute(req.body as any));
  app.get("/v1/health", async () => ({ status: "ok" }));
}