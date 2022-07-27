import type { RouteHandler } from 'fastify';
import type { RouteParams } from '../../common/common.schema';
import { getObraComIdsUrlsAutores } from '../../helpers/routes.helper';
import type {
  ObraListReply,
  ObraPostBody,
  ObraPutBody,
  ObraReply,
} from './schemas';

export const getObrasHandler: RouteHandler<{ Reply: ObraListReply }> =
  async function (req, reply) {
    const obras = await req.server.prisma.obra.findMany({
      include: { autores: true },
    });
    const result: ObraListReply = {
      sucesso: true,
      mensagem: 'Operação realizada com sucesso.',
      obras: obras.map(obra => {
        return getObraComIdsUrlsAutores(obra);
      }),
    };

    reply.send(result);
  };

export const getOneObraHandler: RouteHandler<{
  Params: RouteParams;
  Reply: ObraReply;
}> = async function (req, reply) {
  const { id } = req.params;

  const obra = await req.server.prisma.obra.findUnique({
    where: { id },
    include: { autores: true },
  });

  const result: ObraReply = {
    mensagem: '',
    erro: undefined,
    sucesso: true,
    obra: undefined,
  };

  if (!obra) {
    result.mensagem = 'Erro ao realizar operação.';
    result.sucesso = false;
    result.erro = { 1: 'Obra não encontrada.' };

    return reply.code(404).send(result);
  }

  result.mensagem = 'Operação realizada com sucesso.';
  result.obra = getObraComIdsUrlsAutores(obra!);
  return reply.send(result);
};

export const postObraHandler: RouteHandler<{
  Body: ObraPostBody;
  Reply: ObraReply;
}> = async function (req, reply) {
  const { autores, editora, titulo, urlFoto } = req.body;

  try {
    const obra = await req.server.prisma.obra.create({
      data: {
        editora,
        titulo,
        urlFoto,
        autores: {
          connectOrCreate: autores.map(autor => {
            return { where: { nome: autor }, create: { nome: autor } };
          }),
        },
      },
      include: { autores: true },
    });

    reply.send({
      mensagem: '',
      sucesso: true,
      obra: obra,
    });
  } catch (err) {
    reply
      .code(400)
      .send({ mensagem: 'erro', sucesso: false, erro: err as any });
  }
};

export const putObraHandler: RouteHandler<{
  Params: RouteParams;
  Body: ObraPutBody;
  Reply: ObraReply;
}> = async function (req, reply) {
  console.log(req, reply);
};

export const deleteObraHandler: RouteHandler<{ Params: RouteParams }> =
  async function (req, reply) {
    console.log(req, reply);
  };
