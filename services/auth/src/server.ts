
import Fastify from "fastify";
import jwt from "jsonwebtoken";

const app = Fastify();

app.post("/token", async (req, reply) => {
  const token = jwt.sign({ sub: "user", roles: ["ADMIN"] }, process.env.JWT_SECRET!);
  reply.send({ token });
});

app.listen({ port: 4000 });
