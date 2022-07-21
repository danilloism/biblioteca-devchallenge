import { FastifyInstance } from 'fastify';
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
} from './schema';

export default async (fastify: FastifyInstance) => {
  fastify.addSchema(obraSchema);
  fastify.get('/', { schema: getObrasSchema }, getObrasHandler);
  fastify.get('/:obraId', { schema: getOneObraSchema }, getOneObraHandler);
  fastify.put('/:obraId', { schema: putObraSchema }, putObraHandler);
  fastify.post('/', { schema: postObraSchema }, postObraHandler);
  fastify.delete('/:obraId', { schema: deleteObraSchema }, deleteObraHandler);
};
