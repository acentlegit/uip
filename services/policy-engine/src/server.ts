
import Fastify from "fastify";
const app = Fastify();

app.post("/execute", async (req, reply) => {
  reply.send({
    engine: "policy",
    outcome: "PASS"
  });
});

app.listen({ port: 3000 });
