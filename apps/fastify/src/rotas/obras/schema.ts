import { FastifySchema } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';

const requiredValues = ['titulo', 'editora', 'foto', 'autores'] as const;
const requiredDtoValues = ['mensagem', 'sucesso'] as const;

export const obraSchema = {
  $id: 'obra',
  type: 'object',
  properties: {
    id: { type: 'number' },
    titulo: { type: 'string' },
    editora: { type: 'string' },
    foto: { type: 'string' },
    autores: { type: 'array', items: { type: 'string' } },
  },
  additionalProperties: false,
} as const;

const paramsSchema = {
  $id: 'params',
  type: 'object',
  properties: { id: { type: 'number' } },
  additionalProperties: false,
  required: ['id'],
} as const;

const obraSchemaWithRequiredFields = {
  $ref: 'obra#',
  required: requiredValues,
} as const;

const replyListSchema = {
  type: 'object',
  properties: {
    mensagem: { type: 'string' },
    sucesso: { type: 'boolean' },
    obras: {
      type: 'array',
      items: {
        $ref: 'obra#',
        required: requiredValues,
      },
    },
    erro: { type: 'object' },
  },
  required: requiredDtoValues,
  additionalProperties: false,
} as const;

const replySchema = {
  type: 'object',
  properties: {
    mensagem: { type: 'string' },
    sucesso: { type: 'boolean' },
    obra: {
      required: requiredValues,
      $ref: 'obra#',
    },
    erro: { type: 'object' },
  },
  required: requiredDtoValues,
  additionalProperties: false,
} as const;

export type ReplyList = FromSchema<
  typeof replyListSchema,
  { references: [typeof obraSchema] }
>;
export type Reply = FromSchema<
  typeof replySchema,
  { references: [typeof obraSchema] }
>;
export type Params = FromSchema<typeof paramsSchema>;

export type PostBody = FromSchema<
  typeof obraSchemaWithRequiredFields,
  { references: [typeof obraSchema] }
>;
export type PutBody = FromSchema<typeof obraSchema>;

/*-------------_ Route Schemas _-------------*/

export const getObrasSchema: FastifySchema = {
  tags: ['Obras'],
  description: 'Obter todas as obras',
  response: {
    200: { ...replyListSchema },
  },
};

export const getOneObraSchema: FastifySchema = {
  tags: ['Obras'],
  description: 'Obter obra através do id',
  params: paramsSchema,
  response: {
    200: { ...replySchema },
  },
};

export const postObraSchema: FastifySchema = {
  tags: ['Obras'],
  description: 'Registra uma nova obra',
  body: obraSchemaWithRequiredFields,
  response: {
    201: {
      headers: {
        Location: { type: 'string', description: 'URL do novo recurso' },
      },
      ...replySchema,
    },
  },
};

export const putObraSchema: FastifySchema = {
  tags: ['Obras'],
  description: 'Atualiza uma obra',
  body: obraSchema,
  params: paramsSchema,
  response: {
    200: {
      headers: {
        Location: { type: 'string', description: 'URL do recurso atualizado' },
      },
      ...replySchema,
    },
    404: {},
  },
};

export const deleteObraSchema: FastifySchema = {
  tags: ['Obras'],
  description: 'Deleta uma obra',
  params: paramsSchema,
  response: {
    204: {
      description: 'Obra foi deletada',
      type: 'null',
    },
    404: {},
  },
};
