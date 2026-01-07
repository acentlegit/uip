
import Fastify from 'fastify';
import swaggerPlugin from '../../../packages/swagger/swagger';

const app = Fastify({ logger: true });

app.register(swaggerPlugin);

app.post('/intents', {
  schema: {
    body: {
      type: 'object',
      properties: {
        type: { type: 'string' },
        industry: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          intentId: { type: 'string' }
        }
      }
    }
  }
}, async (req, reply) => {
  reply.send({ intentId: 'demo-id' });
});

app.listen({ port: 3000 });
