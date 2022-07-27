import { PrismaClient } from '@prisma/client';
import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async fastify => {
  const prisma = new PrismaClient();
  await prisma.$connect();

  fastify.decorate('prisma', prisma);
  fastify.addHook(
    'onClose',
    async fastify => await fastify.prisma.$disconnect(),
  );
});

export default fp(async fastify => fastify.register(prismaPlugin));
