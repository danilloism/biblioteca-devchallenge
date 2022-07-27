import type { FromSchema } from 'json-schema-to-ts';

export const routeParamsSchema = {
  $id: 'params',
  type: 'object',
  properties: { id: { type: 'number' } },
  additionalProperties: false,
  required: ['id'],
} as const;

export type RouteParams = FromSchema<typeof routeParamsSchema>;
