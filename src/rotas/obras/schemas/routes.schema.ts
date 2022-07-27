import type { FastifySchema } from 'fastify';
import { routeParamsSchema } from '../../../common/common.schema';
import { obraSchema } from './';
import {
  obraListReplySchema,
  obraPostBodySchema,
  obraReplySchema,
} from './payload.schema';

export const getObrasSchema: FastifySchema = {
  tags: ['Obras'],
  description: 'Obter todas as obras',
  response: {
    200: { ...obraListReplySchema },
  },
};

export const getOneObraSchema: FastifySchema = {
  tags: ['Obras'],
  description: 'Obter obra através do id',
  params: routeParamsSchema,
  response: {
    200: { ...obraReplySchema },
  },
};

export const postObraSchema: FastifySchema = {
  tags: ['Obras'],
  description: 'Registra uma nova obra',
  body: obraPostBodySchema,
  response: {
    201: {
      headers: {
        Location: { type: 'string', description: 'URL do novo recurso' },
      },
      ...obraReplySchema,
    },
  },
};

export const putObraSchema: FastifySchema = {
  tags: ['Obras'],
  description: 'Atualiza uma obra',
  body: obraSchema,
  params: routeParamsSchema,
  response: {
    200: {
      headers: {
        Location: { type: 'string', description: 'URL do recurso atualizado' },
      },
      ...obraReplySchema,
    },
    404: {},
  },
};

export const deleteObraSchema: FastifySchema = {
  tags: ['Obras'],
  description: 'Deleta uma obra',
  params: routeParamsSchema,
  response: {
    204: {
      description: 'Obra foi deletada',
      type: 'null',
    },
    404: {},
  },
};
