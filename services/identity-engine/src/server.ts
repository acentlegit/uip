
import Fastify from "fastify";
const app = Fastify();

app.post("/execute", async (req, reply) => {
  reply.send({
    engine: "identity",
    outcome: "PASS"
  });
});

app.listen({ port: 3000 });
