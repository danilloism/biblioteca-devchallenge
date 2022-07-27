import type { FastifyInstance } from 'fastify';
import {
  deleteObraHandler,
  getObrasHandler,
  getOneObraHandler,
  postObraHandler,
  putObraHandler,
} from './handler';
import {
  deleteObraSchema,
  getObrasSchema,
  getOneObraSchema,
  obraSchema,
  postObraSchema,
  putObraSchema,
} from './schemas';

export default async function obrasRouter(fastify: FastifyInstance) {
  fastify.addSchema(obraSchema);
  fastify.get('/', { schema: getObrasSchema }, getObrasHandler);
  fastify.get('/:id', { schema: getOneObraSchema }, getOneObraHandler);
  fastify.put('/:id', { schema: putObraSchema }, putObraHandler);
  fastify.post('/', { schema: postObraSchema }, postObraHandler);
  fastify.delete('/:id', { schema: deleteObraSchema }, deleteObraHandler);
}
