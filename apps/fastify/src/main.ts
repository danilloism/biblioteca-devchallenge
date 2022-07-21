import 'dotenv/config';
import Fastify from 'fastify';
import autoLoad from '@fastify/autoload';
import { join } from 'path';
import compress from '@fastify/compress';
import pino from 'pino';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';

const start = async () => {
  const env = process.env.ENV;
  const server = Fastify({
    logger: pino({ level: env == 'prod' ? 'info' : 'trace' }),
  });

  server.register(compress);
  server.register(helmet);
  server.register(cors);
  server.register(autoLoad, { dir: join(__dirname, 'plugins') });
  server.register(autoLoad, { dir: join(__dirname, 'rotas') });

  server.listen({ port: 8080 }, (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }

    server.log.info(`Server iniciado em ${address}`);
  });
};

start();
