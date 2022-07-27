import type { FromSchema } from 'json-schema-to-ts';
import { obraCommonProps, obraSchema } from './obra.schema';

const requiredValues = ['titulo', 'editora', 'urlFoto'] as const;
const requiredDtoValues = ['sucesso'] as const;
const requiredReplyDtoValues = ['urlAutores', 'idsAutores'] as const;
const autoresRefFields = {
  urlAutores: { type: 'array', items: { type: 'string' } },
  idsAutores: { type: 'array', items: { type: 'number' } },
} as const;

export const obraPostBodySchema = {
  type: 'object',
  properties: {
    ...obraCommonProps,
    autores: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: [...requiredValues, 'autores'],
  additionalProperties: false,
} as const;

export const obraListReplySchema = {
  type: 'object',
  properties: {
    mensagem: { type: 'string' },
    sucesso: { type: 'boolean' },
    obras: {
      type: 'array',
      items: {
        $ref: 'obra#',
        required: requiredValues, //todo
      },
    },
    erro: { type: 'object' },
  },
  required: requiredDtoValues, //todo
  additionalProperties: false,
} as const;

export const obraReplySchema = {
  type: 'object',
  properties: {
    mensagem: { type: 'string' },
    sucesso: { type: 'boolean' },
    obra: {
      required: requiredValues, //todo
      $ref: 'obra#',
    },
    erro: { type: 'object' },
  },
  required: requiredDtoValues,
  additionalProperties: false,
} as const;

export type ObraListReply = FromSchema<
  typeof obraListReplySchema,
  { references: [typeof obraSchema] }
>;
export type ObraReply = FromSchema<
  typeof obraReplySchema,
  { references: [typeof obraSchema] }
>;

export type ObraPostBody = FromSchema<
  typeof obraPostBodySchema,
  { references: [typeof obraSchema] }
>;
export type ObraPutBody = FromSchema<typeof obraSchema>;
