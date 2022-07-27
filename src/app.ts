import autoLoad from '@fastify/autoload';
import compress from '@fastify/compress';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import type { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import 'dotenv/config';
import Fastify from 'fastify';
import { join } from 'path';
import pino from 'pino';
import { autorSchema } from './rotas/autores/schema';
import obrasRouter from './rotas/obras/router';

async function app() {
  const env = process.env['NODE_ENV'];

  const app = Fastify({
    logger: pino({ level: env == 'prod' ? 'info' : 'trace' }),
  }).withTypeProvider<JsonSchemaToTsProvider>();

  app
    .register(compress)
    .register(helmet)
    .register(cors, {
      origin: env == 'production',
      hideOptionsRoute: env == 'production',
    })
    .addSchema(autorSchema)
    .register(autoLoad, { dir: join(__dirname, 'plugins') })
    .register(obrasRouter, { prefix: '/obras/' })
    .setErrorHandler((err, _, reply) => {
      return reply.code(err.statusCode || 400).send({
        sucesso: false,
        mensagem: 'Erro ao realizar operação.',
        erro: err.message,
      });
    });

  return app;
}

export { app };
