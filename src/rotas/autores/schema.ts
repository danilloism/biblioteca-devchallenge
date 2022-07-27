import type { FromSchema } from 'json-schema-to-ts';

export const autorSchema = {
  $id: 'autor',
  type: 'object',
  properties: {
    id: { type: 'number' },
    nome: { type: 'string' },
  },
  additionalProperties: false,
  required: ['nome'],
} as const;

export type AutorReply = FromSchema<typeof autorSchema>;
