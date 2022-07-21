import { RouteHandler } from 'fastify';
import { Params, PostBody, PutBody, Reply, ReplyList } from './schema';

export const getObrasHandler: RouteHandler<{ Reply: ReplyList }> =
  async function (req, reply) {};

export const getOneObraHandler: RouteHandler<{ Params: Params }> =
  async function (req, reply) {};

export const postObraHandler: RouteHandler<{ Body: PostBody; Reply: Reply }> =
  async function (req, reply) {};

export const putObraHandler: RouteHandler<{
  Params: Params;
  Body: PutBody;
  Reply: Reply;
}> = async function (req, reply) {};

export const deleteObraHandler: RouteHandler<{ Params: Params }> =
  async function (req, reply) {};
