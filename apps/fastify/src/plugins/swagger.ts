import fp from 'fastify-plugin';
import swagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger';

export default fp<FastifyDynamicSwaggerOptions>(async (fastify, opts) => {
  fastify.register(swagger, {
    openapi: {
      info: { title: '', description: '', version: '' },
      servers: [{ url: '' }],
    },
    exposeRoute: true,
  });
});
