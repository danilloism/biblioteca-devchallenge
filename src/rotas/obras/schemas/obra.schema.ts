export const obraCommonProps = {
  id: { type: 'number' },
  titulo: { type: 'string' },
  editora: { type: 'string' },
  urlFoto: { type: 'string' },
} as const;

export const obraSchema = {
  $id: 'obra',
  type: 'object',
  properties: obraCommonProps,
  additionalProperties: false,
} as const;
