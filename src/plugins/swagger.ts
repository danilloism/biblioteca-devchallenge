import fp from 'fastify-plugin';
import swagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger';

export default fp<FastifyDynamicSwaggerOptions>(async fastify => {
  fastify.register(swagger, {
    openapi: {
      info: { title: '', description: '', version: '' },
      servers: [
        {
          url: `${process.env.HOST || 'localhost'}:${process.env.PORT || 8080}`,
        },
      ],
    },
    exposeRoute: true,
  });
});
