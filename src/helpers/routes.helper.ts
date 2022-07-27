import type { Autor, Obra } from '@prisma/client';

export function gerarUrlRecurso(dominio: string, id: number) {
  return `http://${process.env['HOST'] || 'localhost'}:${
    process.env['PORT'] || 8080
  }/${dominio}/${id}`;
}

export function getObraComIdsUrlsAutores(obra: Obra & { autores: Autor[] }) {
  const idsAutores = obra.autores.map(autor => autor.id);
  const urlAutores = obra.autores.map(autor =>
    gerarUrlRecurso('autores', autor.id),
  );
  return {
    ...obra,
    idsAutores,
    urlAutores,
  };
}
